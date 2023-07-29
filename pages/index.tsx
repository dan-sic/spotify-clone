import { PlayerLayout } from '@/components/player-layout'
import { useUser } from '@/modules/auth/hooks/use-user'

const Home = () => {
  const { user } = useUser()
  return (
    <>
      <p>{user?.email}</p>
    </>
  )
}

Home.getLayout = (page: React.ReactNode) => <PlayerLayout>{page}</PlayerLayout>

export default Home
