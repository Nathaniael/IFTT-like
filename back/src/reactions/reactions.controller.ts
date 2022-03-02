import { Req, Body, Controller, Post } from '@nestjs/common';
import { MailReactionDto, DiscordMsgReactionDto } from './reactions.dto';
const { Webhook } = require('discord-webhook-node');

@Controller('reactions')
export class ReactionsController {

    @Post('/Mailjet')
    async printstp(@Body() config: MailReactionDto) {
        console.log("config: ", config)
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
            console.log("test: ", result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

    }

    @Post('Discord')
    async actionDiscord(@Req() req, @Body() body : DiscordMsgReactionDto) {
        const hook = new Webhook(body.url)
        hook.setUsername(body.hookusername)
        hook.send(body.message)
    }
}