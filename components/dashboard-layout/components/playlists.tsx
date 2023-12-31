import { usePlaylists } from '@/hooks/use-playlists'
import Link from 'next/link'
import { FC } from 'react'

export const Playlists: FC = () => {
  const { data: playlists } = usePlaylists()

  return (
    <ul className="space-y-2 py-2 font-medium">
      {playlists &&
        playlists.map(({ name, id }) => (
          <li key={id}>
            <Link
              href={'/playlist/' + id}
              className="flex items-center text-gray-500 hover:bg-gray-300 transition duration-75 hover:text-gray-900 group p-2 pl-5"
            >
              <span className="">{name}</span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
