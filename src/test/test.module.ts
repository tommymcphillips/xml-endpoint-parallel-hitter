import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import {InputSchema} from '../inputs/input.schema';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Input', schema: InputSchema}])
    ],
    controllers: [TestController],
    providers: [TestService],


})
export class TestModule {}
