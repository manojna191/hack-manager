import mongoose, { Schema, Document } from 'mongoose'

export interface IHackathon {
  hackathonName: string
  projectName: string
  leaderEmail: string
  username: string
  hackathonUri?: string
  teamMatesEmails?: string[]
  githubUri?: string
  importantLinks?: string[]
  startDate?: string | Date
  endDate?: string | Date
  submissionDeadline?: string | Date
  progress?: number
}

interface IDocHackathon extends IHackathon, Document {
  uniqueHash: number
}

const HackathonSchema: Schema = new mongoose.Schema(
  {
    hackathonName: { type: String, required: true },
    projectName: { type: String, required: true },
    leaderEmail: { type: String, required: true },
    username: { type: String, required: true },
    hackathonUri: { type: String },
    teamMatesEmails: [{ type: String }],
    githubUri: { type: String },
    importantLinks: [{ type: String }],
    startDate: { type: Date },
    endDate: { type: Date },
    submissionDeadline: { type: Date },
    progress: { type: Number },
    uniqueHash: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

const Hackathon = mongoose.models.Hackathon || mongoose.model<IDocHackathon>('Hackathon', HackathonSchema)

export default Hackathon
