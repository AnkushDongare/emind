"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Service {
  id: string;
  name: string;
  sessions: number;
  price: number;
  perSessionPrice: number;
  features: string[];
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: RazorpayOptions) => any;
  }
}

export default function AppointmentBooking({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const [service, setService] = useState<Service | null>(null); // Use Service interface
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const router = useRouter()

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services?slug=${params.slug}`);
        const data = await response.json();

        if (data && typeof data === "object") {
          setService(data);
        } else {
          console.error("Unexpected response format:", data);
          setService(null);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to fetch the service.");
        setService(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [params.slug]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast("Failed to load Razorpay SDK. Are you online?");
      return;
    }

    if (!name || !email || !contact) {
      toast("Please fill all the fields before proceeding.");
      return;
    }

    try {
      const response = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: service?.price, // Amount in paisa
          currency: "INR",
          receipt: "receipt#1",
          type: "appointment",
          productId: service?.id,
        }),
      });

      const paymentResponse = await response.json();
      const { order } = paymentResponse;

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: service?.name || "Appointment Booking",
        description: "Appointment booking payment",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          const verificationResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: session?.user?.id,
              orderId: order.id,
              type: "APPOINTMENT",
              amount: order.amount / 100,
              currency: order.currency,
            }),
          });

          const verificationData = await verificationResponse.json();

          if (verificationData.success) {
            await fetch("/api/appointments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: session?.user?.id,
                orderId: order.id,
                name,
                email,
                contact,
                date,
                time,
              }),
            });
            toast("Payment Successful!");
            router.push(`/book-appointment/success/${order.id}`);
          } else {
            toast("Payment verification failed!");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  if (!service) {
    return <div className="text-center text-xl text-gray-500">Service not found.</div>;
  }

  return (
    <div className="pt-40 md:pt-40 px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl font-bold">{service.name}</h1>
  <p className="text-xl sm:text-2xl">Sessions: {service.sessions}</p>
  <p className="text-xl sm:text-2xl">Price: ₹{service.price}</p>
  <p>Per Session Price: ₹{service.perSessionPrice}</p>

  <ul className="list-disc list-inside mt-4 sm:mt-6">
    {service.features && service.features.map((feature: string, index: number) => (
      <li key={index} className="text-base sm:text-lg">{feature}</li>
    ))}
  </ul>

  <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <label className="block">
      Name:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mt-1"
      />
    </label>

    <label className="block">
      Email:
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mt-1"
      />
    </label>

    <label className="block">
      Contact:
      <input
        type="number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mt-1"
      />
    </label>

    <label className="block">
      Date:
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mt-1"
      />
    </label>

    <label className="block">
      Time:
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mt-1"
      />
    </label>
  </div>

  <button
    onClick={handlePayment}
    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md w-full sm:w-auto"
  >
    Pay Now
  </button>
</div>
  );
}
