import { PrismaClient } from '@prisma/client'
import { artistsData } from './seed-data'
import bcrypt from 'bcrypt'

const dbClient = new PrismaClient()

const seed = async () => {
  await Promise.all(
    artistsData.map((artist) => {
      return dbClient.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              duration: song.duration,
              url: song.url,
              name: song.name,
            })),
          },
        },
      })
    })
  )

  const salt = bcrypt.genSaltSync(10)
  const user = await dbClient.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: bcrypt.hashSync('test', salt),
      firstName: 'Test',
      lastName: 'User',
    },
  })

  const songs = await dbClient.song.findMany({})

  await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return dbClient.playlist.create({
        data: {
          name: `Playlist ${i + 1}`,
          user: {
            connect: {
              id: user.id,
            },
          },
          songs: {
            connect: songs.map((song) => ({ id: song.id })),
          },
        },
      })
    })
  )
}

seed()
  .then()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await dbClient.$disconnect())
