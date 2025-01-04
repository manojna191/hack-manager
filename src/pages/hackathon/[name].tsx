import { useRouter } from 'next/router'

const Hackathon: React.FC<{}> = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Hackathon: {router.query.name}</h1>
    </div>
  )
}

export default Hackathon
