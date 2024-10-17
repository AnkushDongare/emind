"use client"
import { useParams, useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccess = () => {
  const router = useRouter();
  const { order_id } = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
      <div className="flex justify-center mb-4">
        <FaCheckCircle className="text-green-600 text-6xl" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
      {order_id && (
        <p className="text-xl mt-4">
          Your Order ID: <strong className="text-green-600">{order_id}</strong>
        </p>
      )}
      <p className="mt-2 text-gray-600">
        Thank you for your appointment booking!
      </p>
      <button
        onClick={() => router.push('/dashboard/view-appointments')}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        View all Booked Appointments
      </button>
    </div>
  </div>
      )
}
export default BookingSuccess