export const get_template = (distance: string, link: string) => {
    return `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Urgent Blood Donation Needed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f8f8;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: #d9534f;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            margin: 20px 0;
            font-size: 16px;
            color: #333333;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background: #d9534f;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Urgent Blood Donation Needed</div>
        <div class="content">
            <p>Every drop counts! A person is need your help ${distance} km away.</p>
            <p>Please help if possible.</p>
            <a href=${link} class="btn">Help Now</a>
        </div>
        <div class="footer">Thank you for your generosity! ❤️</div>
    </div>
</body>
</html>

    `
}