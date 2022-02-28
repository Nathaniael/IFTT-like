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
const common_1 = require("@nestjs/common");
const reactions_dto_1 = require("./reactions.dto");
let ReactionsController = class ReactionsController {
    async printstp(config) {
        console.log("config: ", config);
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
};
__decorate([
    (0, common_1.Post)('/Mailjet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reactions_dto_1.MailReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionsController.prototype, "printstp", null);
ReactionsController = __decorate([
    (0, common_1.Controller)('reactions')
], ReactionsController);
exports.ReactionsController = ReactionsController;
//# sourceMappingURL=reactions.controller.js.map