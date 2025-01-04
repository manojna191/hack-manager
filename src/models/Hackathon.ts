import mongoose, {Schema, Document} from "mongoose";
import {v4 as uuidv4} from 'uuid'

export interface IHackathon extends Document {
    _id: string,
    hackathonName: string,
    projectName: string,
    leaderEmail: string,
    teamMates?: string[],
    githubUri?: string,
    ImportantLinks?: string[],
    progress?: number,
    startDate?: Date,
    endDate?: Date,
    SubmissionDeadline?: Date,
}

const HackathonSchema: Schema = new mongoose.Schema({
    _id: {type: String, required: true, default: uuidv4},
    hackathonName: {type: String, required: true},
    projectName: {type: String, required: true},
    leaderEmail: {type: String, required: true},
    teamMates: {type: String},
    githubUri: {type: String},
    ImportantLinks: {type: String},
    progress: {type: Number},
    startDate: {type: Date},
    endDate: {type: Date},
    SubmissionDeadline: {type: Date},
},{timestamps: true})

const Hackathon = mongoose.models.Hackathon || mongoose.model<IHackathon>('Hackathon', HackathonSchema)

export default Hackathon

