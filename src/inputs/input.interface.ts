import { Document } from 'mongoose';

export interface Input extends Document {
    response: string;
}
