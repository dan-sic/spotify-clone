import Link from 'next/link'
import { FC } from 'react'

const playlists = Array(20)
  .fill(1)
  .map((_, i) => ({
    id: i,
    name: `Playlist ${i}`,
    route: `/playlist/${i}`,
  }))

export const Playlists: FC = () => {
  return (
    <ul className="space-y-2 font-medium h-[60%] overflow-auto">
      {playlists.map(({ name, id, route }) => (
        <li key={id}>
          <Link
            href={route}
            className="flex items-center text-gray-500 hover:bg-gray-300 transition duration-75 hover:text-gray-900 group p-2"
          >
            <span className="ml-3">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
