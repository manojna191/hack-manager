import type { NextApiRequest, NextApiResponse } from 'next'
import Hackathon, { IHackathon } from '@/models/Hackathon'
import { parseISOString } from '@/lib/isoStringParser'
import dbConnect from '@/lib/db'
import bcrypt from 'bcrypt'
import EmailHackthon, { IEmailHackathon } from '@/models/EmailHackthon'

interface uniqueHackathon extends IHackathon {
  uniqueHash: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect()
    let hackathonData: uniqueHackathon = req.body
    const { startDate, endDate, submissionDeadline, importantLinks, hackathonName, username, leaderEmail } =
      hackathonData

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

    const salt = await bcrypt.genSalt()
    const uniqueHashString = hackathonName.toLowerCase() + username.toLowerCase()
    const uniqueHash = await bcrypt.hash(uniqueHashString, salt)

    const uniqueHackathonData = { ...hackathonData, uniqueHash }

    const newHackathon = await Hackathon.create(uniqueHackathonData)

    const EmailHackathon: IEmailHackathon = {
      username: username,
      hackathonName,
      uniqueHash,
    }
    await EmailHackthon.create(EmailHackathon)
    res.status(200).json({ message: 'Hackathon inserted successfully', data: newHackathon })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: `error: ${e}` })
  }
}
