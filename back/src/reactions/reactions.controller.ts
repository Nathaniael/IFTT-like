import { Controller, Post } from '@nestjs/common';

@Controller('reactions')
export class ReactionsController {
    @Post('mail') sendMail(username: string, subject: string, body: string, recipient: string) {
        const mailjet = require ('node-mailjet')
        .connect('95d7f3e348ada34e2587a04a86442e33', 'ea353c779dbd2fa1d3d4372b194a6f95')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": "nathtris95@gmail.com",
                "Name": "Pantharea"
            },
            "To": [
                {
                "Email": recipient,
                "Name": username
                }
            ],
            "Subject": subject,
            "TextPart": body
            }
        ]
        })
        request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

    }
}
