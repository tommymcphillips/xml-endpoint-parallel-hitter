import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Input} from '../inputs/input.interface';
import {InjectModel} from '@nestjs/mongoose';
import axios from 'axios';
import {readFileSync} from 'fs';
import * as path from 'path';

@Injectable()
export class TestService {

    FILE_WITH_THE_XML_FILE_NAMES = 'expediamulti.txt';
    FOLDER_WITH_INPUTS = 'input_files';

    constructor(@InjectModel('Input') private readonly InputModel: Model<Input>) {}

    public async requestSender() {
        try {
            const promiseRequest = [];
            const inputNamesList = await this.inputNamesListReader();
            for (const nameLine of inputNamesList) {
                if (nameLine !== "") {
                    console.log(`line: ${nameLine}`);
                    const xmlRequestFile = await this.xmlRequestFileLoader(nameLine);
                    promiseRequest.push(this.endpointHitter(xmlRequestFile));
                }
            }
            const promisedResolved = await Promise.all(promiseRequest);
            await this.saveResponseInDB(promisedResolved);
            console.log("Promise ALL Finished")
        }
        catch(e){
            console.log(e.message)
        }
    }

    private inputNamesListReader(): string[] {
        return readFileSync(path.join(__dirname, '..', this.FOLDER_WITH_INPUTS, this.FILE_WITH_THE_XML_FILE_NAMES), 'utf-8').split('\n')
    }

    private  xmlRequestFileLoader(fileName: string): string {
        return readFileSync(path.join(__dirname, '..', this.FOLDER_WITH_INPUTS, fileName), 'utf-8');
    }

    private async saveResponseInDB(promisesResolved: Input[]): Promise<void> {
        for (const input of promisesResolved) {
            const newInput = await new this.InputModel(input);
            newInput.save();
        }
    }

    private async endpointHitter(request: string): Promise<Input> {
        const headers = {
            'Content-Type': 'text/xml; charset=utf-8'
        };
        try {
            const { data } = await axios.post('https://endpoint-where-to-do-the-post-request-with-a-xml-file', request, {headers});
            return ({response: data}) as Input
        }
        catch (e) {
            console.log(e, request)
        }
    }
}

