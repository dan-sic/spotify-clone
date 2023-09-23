import prisma from '@/prisma/db-client'
import { apiHandler } from '@/lib/api/api-handler'
import ironSessionOptions from '@/lib/api/iron-session-options'
import { withProtectedRoute } from '@/lib/api/with-protected-route'
import { Playlist } from '@/lib/models/playlist'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const getPlaylists = async (
  req: NextApiRequest,
  res: NextApiResponse<Playlist[]>
) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: req.session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  })
  res.status(200).json(playlists)
}

export default apiHandler({
  GET: withIronSessionApiRoute(
    withProtectedRoute(getPlaylists),
    ironSessionOptions
  ),
})
