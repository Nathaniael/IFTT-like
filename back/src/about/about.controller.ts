import { Controller, Get, Res, Req } from '@nestjs/common';

@Controller('about.json')
export class AboutController {
    @Get()
    async respond(@Req() req, @Res() res) {
        res.status(200).json({
            client: {
                host: req.ip
            },
            server: {
                current_time: Date.now(),
                services: [
                    {
                        name: 'Github',
                        actions: [
                            { name: 'A push arrived', description: 'Create a repository'}
                        ]
                    },
                    {
                        name: 'Mailjet',
                        reactions: [
                            { name: 'Send an email', description: 'Send an email to a chosen recipient with customizable subject/content' },
                        ]
                    }
                ]
            }
        });
    }
}
