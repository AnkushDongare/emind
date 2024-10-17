// templates/testPurchaseConfirmationEmail.ts
export const generateTestPurchaseConfirmationEmail = (otp: number, razorpay_payment_id: string): string => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eMind Cafe - Purchase Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            line-height: 1.5;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
        @media (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>eMind Cafe</h1>
        </div>
        <div class="content">
            <h2>Purchase Confirmation</h2>
            <p>Dear Customer,</p>
            <p>Thank you for your purchase! We are excited to confirm your order with eMind Cafe.</p>
            <p><strong>Order Number:</strong> ${razorpay_payment_id}</p>
            <p>Please verify your purchase by entering the following OTP:</p>
            <div class="otp">${otp}</div>
            <p>To complete your order, click the button below and enter the OTP on the verification page:</p>
            <a href="${process.env.NEXTAUTH_URL}/tests/verify-code" class="button">Verify OTP</a>
        </div>
        <div class="footer">
            <p>© 2024 eMind Cafe. All rights reserved.</p>
            <p>If you have any questions, feel free to <a href="mailto:support@emindcafe.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>

    `;
};
