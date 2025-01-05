import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  linkedinUri?: string
  githubUri?: string
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    linkedinUri: { type: String, unique: true },
    githubUri: { type: String, unique: true },
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
