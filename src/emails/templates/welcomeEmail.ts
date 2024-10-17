// templates/welcomeEmail.ts
export const generateWelcomeEmail = (email: string): string => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to eMindCafe</title>
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
            <h1>Welcome to eMindCafe!</h1>
        </div>
        <div class="content">
            <p>Dear Customer,</p>
            <h3>Your registered email is: ${email},</h3>
            <p>Thank you for joining eMindCafe! We are thrilled to have you as part of our community. Get ready to explore a world of knowledge, resources, and inspiration.</p>
            <p>As a member, you will have access to:</p>
            <ul>
                <li>Exclusive content and articles</li>
                <li>Engaging discussions with like-minded individuals</li>
                <li>Personalized recommendations</li>
            </ul>
            <p>To get started, click the button below:</p>
            <a href="https://emindcafe.com" class="button">Explore Now</a>
        </div>
        <div class="footer">
            <p>© 2024 eMindCafe. All rights reserved.</p>
            <p>If you have any questions, feel free to <a href="mailto:support@emindcafe.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>

    `;
};
