// app.controller.ts

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
    @Get()
    redirectToPlants(@Res() res: Response) {
        res.redirect('/plants');
    }
}
