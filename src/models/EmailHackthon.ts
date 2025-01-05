import mongoose, { Schema, Document } from 'mongoose'
import { IHackathon } from '@/models/Hackathon'

export interface IEmailHackathon {
  username: string
  hackathonName: string
  uniqueHash: string
}

interface IDocEmailHackathon extends IEmailHackathon, Document {}

const EmailHackathonSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hackathonName: { type: String, required: true },
    uniqueHash: { type: String, ref: 'Hackathon' },
  },
  { timestamps: true },
)

EmailHackathonSchema.index({ username: 1, hackathonId: 1 }, { unique: true })

const EmailHackathon =
  mongoose.models.EmailHackathon || mongoose.model<IDocEmailHackathon>('EmailHackathon', EmailHackathonSchema)

export default EmailHackathon
