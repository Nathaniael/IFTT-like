const mailjet = require('node-mailjet').connect('95d7f3e348ada34e2587a04a86442e33', 'ea353c779dbd2fa1d3d4372b194a6f95');
const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
    "Messages": [
        {
            "From": {
                "Email": "nathtris95@gmail.com",
                "Name": "Nathaniael"
            },
            "To": [
                {
                    "Email": "nathtris95@gmail.com",
                    "Name": "Nathaniael"
                }
            ],
            "Subject": "Greetings from Mailjet.",
            "TextPart": "My first Mailjet email",
            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
            "CustomID": "AppGettingStartedTest"
        }
    ]
});
request
    .then((result) => {
    console.log(result.body);
})
    .catch((err) => {
    console.log(err.statusCode);
});
//# sourceMappingURL=mail.js.map