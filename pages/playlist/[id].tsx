import { DashboardLayout } from '@/components/dashboard-layout/dashboard-layout'
import { SongsTable } from '@/components/songs-table/songs-table'
import prisma from '@/prisma/db-client'
import Avatar from '@/public/avatar.png'
import ironSessionOptions from '@/lib/api/iron-session-options'
import { validateSchema } from '@/lib/api/validate-schema'
import { AvatarPageLayout } from '@/components/avatar-page-layout'
// import { Playlist } from '@/shared/models/playlist'
import { NextPageWithLayout } from '@/lib/types'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { z } from 'zod'

const playlistSchema = z.object({
  id: z.string(),
  name: z.string(),
  songs: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      duration: z.number(),
      createdAt: z.date().transform((date) => date.toISOString()),
      artist: z.object({
        name: z.string(),
        id: z.string(),
      }),
    })
  ),
})

export const getServerSideProps = withIronSessionSsr<{
  playlist: z.infer<typeof playlistSchema>
}>(async ({ query, req }) => {
  const user = req.session.user

  const { id } = validateSchema(
    query,
    z.object({
      id: z.string(),
    })
  )

  const playlist = await prisma.playlist.findFirst({
    where: {
      id,
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      songs: {
        select: {
          createdAt: true,
          duration: true,
          id: true,
          name: true,
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  if (!playlist) {
    return {
      notFound: true,
    }
  }

  const dto = validateSchema(playlist, playlistSchema)

  return {
    props: {
      playlist: dto,
    },
  }
}, ironSessionOptions)

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
      <SongsTable songs={playlist?.songs ?? []} />
    </AvatarPageLayout>
  )
}

Playlist.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
)

export default Playlist
