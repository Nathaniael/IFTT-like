import { Body, Controller, Post } from '@nestjs/common';
import { MailReactionDto } from './reactions.dto';
@Controller('reactions')
export class ReactionsController {

    @Post('/mail')
    async printstp(@Body() config: MailReactionDto) {
        const mailjet = require ('node-mailjet')
        .connect('95d7f3e348ada34e2587a04a86442e33', 'ea353c779dbd2fa1d3d4372b194a6f95')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": "areakinaemba@gmail.com",
                "Name": "Pantharea"
            },
            "To": [
                {
                "Email": config.recipient,
                "Name": config.username
                }
            ],
            "Subject": config.subject,
            "TextPart": config.body
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