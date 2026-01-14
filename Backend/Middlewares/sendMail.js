import { createTransport } from "nodemailer";

const sendMail = async (email, subject, otp) => {
    const transport = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD,
        },
        // Force IPv4 address family
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            .container {
                max-width: 400px;
                margin: 20px auto;
                background-color: #0f172a; /* Deep Slate to match your app */
                padding: 40px;
                border-radius: 24px;
                text-align: center;
                color: #f1f5f9;
                border: 1px solid #1e293b;
            }
            .logo {
                background: #4f46e5;
                width: 50px;
                height: 50px;
                border-radius: 12px;
                margin: 0 auto 20px;
                line-height: 50px;
                font-weight: bold;
                font-size: 24px;
                color: white;
            }
            h1 { color: #ffffff; font-size: 24px; margin-bottom: 8px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
            .otp {
                font-size: 42px;
                font-weight: 800;
                letter-spacing: 8px;
                color: #6366f1; /* Indigo */
                margin: 30px 0;
                padding: 15px;
                background: rgba(99, 102, 241, 0.1);
                border-radius: 12px;
                display: inline-block;
            }
            .footer { font-size: 11px; color: #475569; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">C</div>
            <h1>Verification Code</h1>
            <p>Hello, <br/> Enter the code below to access your ChatBot AI account.</p>
            <div class="otp">${otp}</div>
            <div class="footer">Secure Login • MERN AI Project</div>
        </div>
    </body>
    </html>
    `;

    try {
        await transport.sendMail({
            from: `"ChatBot AI" <${process.env.GMAIL}>`,
            to: email,
            subject,
            html,
        });
        console.log("Email sent successfully to:", email);
    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw error; // Re-throw so your controller catches it and stops the loading state
    }
}

export default sendMail;