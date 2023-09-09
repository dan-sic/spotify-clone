import { AvatarPageLayout } from '@/shared/components/avatar-page-layout'
import Image from 'next/image'
import Avatar from '@/public/avatar.png'
import { NextPageWithLayout } from '@/shared/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { validateSchema } from '@/shared/api/validate-schema'
import { z } from 'zod'
import prisma from '@/prisma/db-client'
import { PlayerLayout } from '@/modules/player/components/player-layout'
import { Playlist } from '@/shared/models/playlist'

export const getServerSideProps: GetServerSideProps<{
  playlist: Playlist
}> = async ({ query }) => {
  const { id } = validateSchema(
    query,
    z.object({
      id: z.string(),
    })
  )

  const playlist = await prisma.playlist.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      id: true,
    },
  })

  if (!playlist) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      playlist,
    },
  }
}

const Playlist: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ playlist }) => {
  return (
    <AvatarPageLayout
      color="gray"
      title={`${playlist?.name}`}
      subtitle="PLAYLIST"
      avatarSlot={
        <Image
          style={{ borderRadius: 100 }}
          fill={true}
          alt="User Avatar"
          src={Avatar}
        />
      }
    >
      Songs
    </AvatarPageLayout>
  )
}

Playlist.getLayout = (page: React.ReactNode) => (
  <PlayerLayout>{page}</PlayerLayout>
)

export default Playlist
