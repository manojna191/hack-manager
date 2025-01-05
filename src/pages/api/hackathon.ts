import type { NextApiRequest, NextApiResponse } from 'next'
import Hackathon, { IHackathon } from '@/models/Hackathon'
import { parseISOString } from '@/lib/isoStringParser'
import dbConnect from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect()
    let hackathonData: IHackathon = req.body
    const { startDate, endDate, submissionDeadline, importantLinks } = hackathonData

    if (startDate) {
      hackathonData = { ...hackathonData, startDate: parseISOString(startDate) }
    }

    if (endDate) {
      hackathonData = { ...hackathonData, startDate: parseISOString(endDate) }
    }

    if (submissionDeadline) {
      hackathonData = { ...hackathonData, startDate: parseISOString(submissionDeadline) }
    }

    if (importantLinks) {
      hackathonData = { ...hackathonData, importantLinks: importantLinks.filter((value) => value.length > 0) }
    }

    const newHackathon = await Hackathon.create(hackathonData)
    res.status(200).json({ message: 'Hackathon inserted successfully', data: newHackathon })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: `error: ${e}` })
  }
}
