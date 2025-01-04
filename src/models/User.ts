import mongoose, {Schema, Document} from "mongoose";
import {v4 as uuidv4} from 'uuid'

export interface IUser extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    linkedinUri?: string,
    githubUri?: string
}

const UserSchema: Schema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, default: uuidv4},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    linkedinUri: {type: String, unique: true},
    githubUri: {type: String, unique: true}
},{timestamps: true})

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User

