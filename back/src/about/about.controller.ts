import { Controller, Get, Res, Req } from '@nestjs/common';
import { qAllFieldsFromWhere } from '../queries/queries'
import { AboutService } from './about.service';

@Controller('about.json')
export class AboutController {
    constructor(
        private readonly aboutService: AboutService
    ) { }

    @Get()
    async respond(@Req() req, @Res() res) {
        res.status(200).send(await this.aboutService.aboutJson(req.ip))
    }
}
