import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'
import { IHackathon } from '@/models/Hackathon'

const Register: React.FC<{}> = () => {
  const router = useRouter()

  const [hackathonName, setHackathonName] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')
  const [leaderEmail, setLeaderEmail] = useState<string>('')
  const [hackathonUri, setHackathonUri] = useState<string>('')
  const [teamMatesEmails, setTeamMatesEmails] = useState<string[]>(Array(0).fill(''))
  const [githubUri, setGithubUri] = useState<string>('')
  const [importantLinks, SetImportantLinks] = useState<string[]>(Array(0).fill(''))
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [submissionDeadline, setSubmissionDeadline] = useState<string>('')

  const [teamCount, setTeamCount] = useState<number | undefined>(0)
  const [impLinksCount, setImpLinksCount] = useState<number>(0)

  const [check, setCheck] = useState<boolean>(true)

  const handleTeamCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const count = parseInt(value)
    const finalVal = isNaN(count) || count < 0 || count > 20 ? undefined : count
    setTeamCount(finalVal)
    if (finalVal) {
      setTeamMatesEmails(Array(finalVal).fill(''))
    }
  }

  const handleTeamMateEmail = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTeamMatesEmails = [...teamMatesEmails]
    if (e.target.value !== '') {
      currentTeamMatesEmails[index] = e.target.value
      setTeamMatesEmails(currentTeamMatesEmails)
    }
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>, dateType: string) => {
    const date = e.target.value
    if (date.length === 0) return
    const localDate = new Date(date)
    const utcDate = localDate.toISOString()
    switch (dateType) {
      case '0':
        setStartDate(utcDate)
        break
      case '1':
        setEndDate(utcDate)
        break
      case '2':
        setSubmissionDeadline(utcDate)
        break
      default:
        console.log('enter correct number')
    }
  }

  const handleAddImpLinks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setImpLinksCount((prev) => {
      return prev < 9 ? prev + 1 : prev
    })
  }

  const handleImpLinks = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const impLinks = [...importantLinks]
    if (e.target.value !== '') {
      impLinks[index] = e.target.value
      SetImportantLinks(impLinks)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (hackathonName === '' || projectName === '' || leaderEmail === '') {
      setCheck(false)
      console.log('we are here !!!!!!!')
      return
    }
    const hackathonData: IHackathon = {
      hackathonName,
      projectName,
      leaderEmail,
      hackathonUri,
      teamMatesEmails,
      githubUri,
      importantLinks,
      startDate,
      endDate,
      submissionDeadline,
    }

    console.log('step 1')

    const response = await fetch('/api/hackathon', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hackathonData),
    })

    console.log('step2')

    const data = await response.json()
    console.log(JSON.stringify(data))

    setCheck(true)
    const currentState = history.state
    history.replaceState(currentState, '', `/hackathon/${hackathonName}`)
    router.push(`/hackathon/${hackathonName}`)

    console.log('step3')
  }

  return (
    <div>
      <form>
        <p>Hackathon Name</p>
        <input
          type="text"
          placeholder="Hackthon Name "
          value={hackathonName}
          onChange={(e) => setHackathonName(e.target.value)}
          required={true}
        />
        <p>Hackathon Website Portal</p>
        <input type="text" value={hackathonUri} onChange={(e) => setHackathonUri(e.target.value)} />
        <p>Project Name</p>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <p>Github Url</p>
        <input type="text" value={githubUri} onChange={(e) => setGithubUri(e.target.value)} />
        <div>
          <p>Leader Email Id</p>
          <input type="email" value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} />
          <h4>Team mates</h4>
          <p>Enter number of team mates</p>
          <input type="number" value={teamCount} onChange={handleTeamCount} />
          {Array.from({ length: teamCount ? teamCount : 0 }).map((_, index) => (
            <div key={index}>
              <p>Team mate: {index + 2}</p>
              <input
                type="email"
                value={teamMatesEmails[index] ?? ''}
                onChange={(e) => handleTeamMateEmail(index, e)}
                placeholder={`Email of team mate: ${index + 2}`}
              />
            </div>
          ))}
        </div>
        <p>Start Date</p>
        <input type="datetime-local" onChange={(e) => handleDate(e, '0')} />
        <p> End Date</p>
        <input type="datetime-local" onChange={(e) => handleDate(e, '1')} />
        <p>Deadline of submission</p>
        <input type="datetime-local" onChange={(e) => handleDate(e, '2')} />

        <p>Any Important Links to submit</p>
        <input type="text" />

        <button onClick={handleAddImpLinks}>Add More Links</button>
        {Array.from({ length: impLinksCount }).map((_, index) => (
          <div key={index}>
            <input
              placeholder={`link: ${index + 2}`}
              type="url"
              value={importantLinks[index] ?? ''}
              onChange={(e) => handleImpLinks(e, index)}
            />
          </div>
        ))}
        <div>
          <button onClick={handleSubmit}>Add the hackathon</button>
          {!check ? <div>Please enter the Hackathon name or project name or leader email please</div> : <div></div>}
        </div>
      </form>
    </div>
  )
}

export default Register
