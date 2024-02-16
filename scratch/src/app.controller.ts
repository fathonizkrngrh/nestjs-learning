import { Controller, Get } from "@nestjs/common";

@Controller('/api')
export class AppController {
    @Get('/hi')
    getRootRoute() {
        return 'hi there!';
    }

    @Get('/bye')
    getByeTher() {
        return 'bye there!';
    }
}