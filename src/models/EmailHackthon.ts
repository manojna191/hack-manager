import mongoose, { Schema, Document } from 'mongoose'

export interface IEmailHackathon extends Document {
  emailId: string
  hackathonId: string
}

const EmailHackathonSchema: Schema = new mongoose.Schema(
  {
    emailId: { type: String, required: true },
    hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
  },
  { timestamps: true },
)

EmailHackathonSchema.index({ email: 1, hackathonId: 1 }, { unique: true })

const EmailHackathon =
  mongoose.models.EmailHackathon || mongoose.model<IEmailHackathon>('EmailHackathon', EmailHackathonSchema)

export default EmailHackathon
