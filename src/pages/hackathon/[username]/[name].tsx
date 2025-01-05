import { useRouter } from 'next/router'
import {GetServerSideProps, GetStaticPaths, GetStaticProps} from 'next'
import {useEffect} from "react";
import React from "react";
import dbConnect from "@/lib/db";
import EmailHackathon from "@/models/EmailHackthon";
import bcrypt from "bcrypt";
import Hackathon from "@/models/Hackathon";

const Hackathon1 = ({projectName, leaderEmail, hackathonUri, githubUri,teamMatesEmails, submissionDeadline}: any) => {
  const router = useRouter()

  const {username, name} = router.query

  return (
    <div>
      <h1>Hackathon: {name}</h1>
      <p>{projectName}</p>
      <p>{leaderEmail}</p>
      <p>{hackathonUri}</p>
      <p>{githubUri}</p>
      <p>{teamMatesEmails}</p>
      <p>{submissionDeadline}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const name = params?.name
  const username = params?.username

  console.log(name, username)
  // const response = await fetch(`${process.env.PUBLIC_BASE_URL}/api/hackathon/${username}/${name}`)
  // const hackathonData = await response.json()
  // console.log((hackathonData))

  await dbConnect()
  if (name && username) {
    const uniqueHashString = name.toString().toLowerCase() + username.toString().toLowerCase()
    const userName = username.toString()
    const hackathonName =  name.toString()
    const result = await EmailHackathon.findOne({username: userName, hackathonName })
    console.log('HEREEEEE!!!!')

    if(!result){
      return {
        props: {},
      }
    }

    const uniqueHash = result.uniqueHash
    const bcryptResult = await bcrypt.compare(uniqueHashString, uniqueHash)

    if(!bcryptResult){
      return {
        props: {},
      }
    }

    const hackathonData = await Hackathon.findOne({uniqueHash})

    const {projectName, leaderEmail, hackathonUri, githubUri,teamMatesEmails, submissionDeadline  } = hackathonData

    let deadline = submissionDeadline.toString()
    if(!hackathonData){
      return {
        props: {},
      }
    }

    return {
      props: {
        projectName,
        leaderEmail,
        hackathonUri,
        githubUri,
        teamMatesEmails,
        deadline
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [], // No paths defined upfront
//     fallback: true,
//   }
// }
export default Hackathon1
