import {Controller, Get, Res, HttpStatus} from '@nestjs/common';
import {TestService} from './test.service';


@Controller('test')
export class TestController {

    constructor(private testService: TestService){}

@Get()
async test(@Res() res) {

    const result = await this.testService.requestSender();
    return res.status(HttpStatus.OK).json(result);
}
}
