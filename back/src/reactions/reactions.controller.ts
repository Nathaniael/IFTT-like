require('dotenv').config()
import { Req, Body, Controller, Post } from '@nestjs/common';
import { MailReactionDto, DiscordMsgReactionDto, SmsReactionDto } from './reactions.dto';
const { Webhook } = require('discord-webhook-node');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

@Controller('reactions')
export class ReactionsController {
    @Post('/Mailjet')
    async reactionMail(@Body() config: MailReactionDto) {
        console.log("JE PASSE ICI")
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
    async reactionDiscord(@Body() body : DiscordMsgReactionDto) {
        const hook = new Webhook(body.url)
        hook.setUsername(body.hookusername)
        hook.send(body.message)
    }

    @Post('Sms')
    async reactionSms(@Body() body : SmsReactionDto) {
        twilio.messages
      .create({body: body.message, from: '+15076936709', to: body.number})
      .then(message => console.log(message));
    }
}