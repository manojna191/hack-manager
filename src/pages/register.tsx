import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const Register: React.FC<{}> = () => {

    const [hackathonName, setHackathonName] = useState<String>('')

    const router = useRouter()

    const handleSubmit = useCallback(() => {
        const currentState = history.state
        history.replaceState(currentState, '', `/hackathon/${hackathonName}`)
        router.push(`/hackathon/${hackathonName}`)
    }, [])

    return (
        <div>
            <form onSubmit={() => {}}>
               <label>Enter Username</label>
               <input type="text"/>

               <p>Hackathon Name</p>
               <input type="text"/>

               <p>Hackathon Website Portal</p>
               <input type="text"/>

               <p>Project Name</p>
               <input type="text"/>

               <p>Github Url</p>
               <input type="text"/>

               <div>
                <h4>Team mates</h4>
                <p>Enter number of team mates</p>
                {/* maximum team mates 20 */}

                <p>Text boxes to get the team mate details</p>
               </div>

               <p>Start Date</p>
               <input type="date"/>

               <p> End Date</p>
               <input type="date"/>

               <p>Deadline of submission</p>
               <input type="date"/> <input type="time"/>

               <div>
                <button type="submit" onSubmit={handleSubmit}>Submit</button>
               </div>
            </form>
        </div>
    )
}

export default Register