const mailgun = require("mailgun-js");

async function sendEmail(
    data,
    callback = (error, body) => {
        console.log("error email", error);
        console.log("body email", body);
    },
) {
    const DOMAIN = process.env.EMAIL_DOMAIN;
    const mg = mailgun({
        apiKey: process.env.MAILGUN_EMAIL_API_KEY,
        domain: DOMAIN,
    });

    let emailData = {
        from: "Deepak from Buildoors <no-reply@mail.dsindhwani55@gmail.com>",
        ...data,
    };

    mg.messages().send(emailData, callback);
}

export default sendEmail;
