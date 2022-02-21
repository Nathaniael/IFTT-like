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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsController = void 0;
const common_1 = require("@nestjs/common");
let ReactionsController = class ReactionsController {
    sendMail(username, subject, body, recipient) {
        const mailjet = require('node-mailjet')
            .connect('95d7f3e348ada34e2587a04a86442e33', 'ea353c779dbd2fa1d3d4372b194a6f95');
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
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
        });
        request
            .then((result) => {
            console.log(result.body);
        })
            .catch((err) => {
            console.log(err.statusCode);
        });
    }
};
__decorate([
    (0, common_1.Post)('mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ReactionsController.prototype, "sendMail", null);
ReactionsController = __decorate([
    (0, common_1.Controller)('reactions')
], ReactionsController);
exports.ReactionsController = ReactionsController;
//# sourceMappingURL=reactions.controller.js.map