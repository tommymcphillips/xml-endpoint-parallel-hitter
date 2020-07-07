import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TestModule} from './test/test.module';

const mongoConfig = {
    uri: 'mongodb://localhost:27017/api_response', options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
};

@Module({
    imports: [
        MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
        TestModule
    ],
    controllers: [],
})
export class AppModule {
}
