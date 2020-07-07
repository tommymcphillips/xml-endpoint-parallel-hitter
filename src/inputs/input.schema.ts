import * as mongoose from 'mongoose';

export const InputSchema = new mongoose.Schema({
    response: String,
}, {versionKey: false});
