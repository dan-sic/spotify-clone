import { useUser } from '@/modules/auth/hooks/use-user'
import { PlayerLayout } from '@/modules/player/components/player-layout'
import prisma from '@/prisma/db-client'
import Avatar from '@/public/avatar.png'
import ironSessionOptions from '@/shared/api/iron-session-options'
import { AvatarPageLayout } from '@/shared/components/avatar-page-layout'
import { Card, CardContent, CardFooter } from '@/shared/components/card'
import { withIronSessionSsr } from 'iron-session/next'
import type { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const user = req.session.user

  const artists = await prisma.artist.findMany({
    select: {
      name: true,
      id: true,
    },
  })

  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })
  return {
    props: {
      artists,
      playlistsCount,
    },
  }
}, ironSessionOptions)

const Home = ({
  artists,
  playlistsCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  return (
    <AvatarPageLayout
      color="gray"
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="PROFILE"
      detailSlot={<span>{`${playlistsCount} Public Playlists`}</span>}
      avatarSlot={
        <Image
          style={{ borderRadius: 100 }}
          fill={true}
          alt="User Avatar"
          src={Avatar}
        />
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-white text-lg font-bold">
            Top artists this month
          </h3>
          <span className="text-sm text-gray-400">Only visible to you</span>
        </div>
        <div className="flex space-x-3">
          {artists.map(({ name, id }) => (
            <Card
              key={id}
              className="bg-gray-800 border-none p-3 w-44 bg-opacity-25 space-y-2"
            >
              <CardContent className="w-32 h-32 relative mx-auto">
                <Image
                  style={{ borderRadius: 100 }}
                  fill={true}
                  alt="Artist Avatar"
                  src={Avatar}
                />
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-2">
                  <span className="text-white text-md font-semibold">
                    {name}
                  </span>
                  <span className="text-xs text-gray-400">Artist</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AvatarPageLayout>
  )
}

Home.getLayout = (page: React.ReactNode) => <PlayerLayout>{page}</PlayerLayout>

export default Home
