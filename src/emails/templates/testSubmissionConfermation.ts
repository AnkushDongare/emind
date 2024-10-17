export const generateTestSubmissionConfirmationEmail = (resultLink: string): string => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eMind Cafe - Test Submission Confirmation</title>
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
            <h2>Test Submission Successful</h2>
            <p>Hello Customer,</p>
            <p>Thank you for completing the test. We have successfully received your responses.</p>
            <p>You can view your results by clicking the button below:</p>
            <a href="${resultLink}" class="button">View Results</a>
            <p>If you have any questions or concerns, feel free to contact us.</p>
        </div>
        <div class="footer">
            <p>© 2024 eMind Cafe. All rights reserved.</p>
            <p>If you have any questions, feel free to <a href="mailto:support@emindcafe.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>

  `
}
