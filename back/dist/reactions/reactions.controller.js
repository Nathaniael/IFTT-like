"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsController = void 0;
require('dotenv').config();
const common_1 = require("@nestjs/common");
const discord_webhook_node_1 = require("discord-webhook-node");
const user_service_1 = require("../user/user.service");
const reactions_dto_1 = require("./reactions.dto");
const { Webhook } = require('discord-webhook-node');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
let ReactionsController = class ReactionsController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async reactionMail(config) {
        console.log("JE PASSE ICI");
        const mailjet = require('node-mailjet')
            .connect('95d7f3e348ada34e2587a04a86442e33', 'ea353c779dbd2fa1d3d4372b194a6f95');
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
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
        });
        request
            .then((result) => {
            console.log("test: ", result.body);
        })
            .catch((err) => {
            console.log(err.statusCode);
        });
    }
    async reactionDiscord(body) {
        const hook = new Webhook(body.url);
        hook.setUsername(body.hookusername);
        if (body.title !== null && body.title !== undefined) {
            const embed = new discord_webhook_node_1.MessageBuilder();
            embed.setFooter('Sent with :heart: by AREA');
            embed.setTitle(body.title);
            embed.addField(body.fieldname, body.fielddescription);
            embed.setDescription(body.message);
            hook.send(embed);
            return;
        }
        hook.send(body.message);
    }
    async changeUsername(body) {
        this.usersService.changeUsername(body.user_id, body.newUsername);
    }
    async reactionSms(body) {
        twilio.messages
            .create({ body: body.message, from: '+15076936709', to: body.number })
            .then(message => console.log(message));
    }
};
__decorate([
    (0, common_1.Post)('/Mailjet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reactions_dto_1.MailReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionsController.prototype, "reactionMail", null);
__decorate([
    (0, common_1.Post)('Discord'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reactions_dto_1.DiscordMsgReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionsController.prototype, "reactionDiscord", null);
__decorate([
    (0, common_1.Post)('Area'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReactionsController.prototype, "changeUsername", null);
__decorate([
    (0, common_1.Post)('Sms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reactions_dto_1.SmsReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionsController.prototype, "reactionSms", null);
ReactionsController = __decorate([
    (0, common_1.Controller)('reactions'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ReactionsController);
exports.ReactionsController = ReactionsController;
//# sourceMappingURL=reactions.controller.js.map