import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/db'
import bcrypt from 'bcrypt'
import EmailHackathon from "@/models/EmailHackthon";
import Hackathon from "@/models/Hackathon";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect()
    console.log('HEREEEEE')
    const { username, hackName } = req.query

    if (hackName && username) {
        const uniqueHashString = hackName.toString().toLowerCase() + username.toString().toLowerCase()
      const userName = username.toString()
      const hackathonName =  hackName.toString()
      const result = await EmailHackathon.findOne({username: userName, hackathonName })
      console.log('HEREEEEE!!!!')

      if(!result){
        return res.status(400).json({ message: 'enter the valid values 1' })
      }

      const uniqueHash = result.uniqueHash
      const bcryptResult = await bcrypt.compare(uniqueHashString, uniqueHash)

      if(!bcryptResult){
        return res.status(400).json({ message: 'enter the valid values 2' })
      }

      const hackathonData = await Hackathon.findOne(uniqueHash)

      if(!hackathonData){
        return res.status(400).json({ message: 'enter the valid values 3' })
      }
      return res.status(200).json({ message: 'success', data: hackathonData })
    } else {
      return res.status(400).json({ message: 'enter the required values' })
    }
  } catch (e) {
    console.log(e)
  }
}
