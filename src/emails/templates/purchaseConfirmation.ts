// templates/purchaseConfirmation.ts
export const generatePurchaseConfirmationEmail = (razorpay_payment_id: string): string => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Purchase Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #4CAF50;
                    padding: 15px;
                    color: #fff;
                    border-radius: 8px 8px 0 0;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>eMind Cafe - Appointment Booked Successfully</h2>
                </div>
                <div class="content">
                    <p>Dear Customer,</p>
                    <p>Thank you for booking an appointment with us! Your payment has been successfully processed.</p>
                    <p>Your payment ID is: <strong>${razorpay_payment_id}</strong></p>
                    <p>Please keep this ID for your records. If you have any issues, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>eMind Cafe | All Rights Reserved © 2024</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
