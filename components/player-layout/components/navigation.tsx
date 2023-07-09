import Link from 'next/link'
import { FC } from 'react'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdAdd,
  MdFavorite,
} from 'react-icons/md'

const primaryNav = [
  {
    label: 'Home',
    route: '/',
    Icon: MdHome,
  },
  {
    label: 'Search',
    route: '/search',
    Icon: MdSearch,
  },
  {
    label: 'Home',
    route: '/library',
    Icon: MdLibraryMusic,
  },
]
const secondaryNav = [
  {
    label: 'Create Playlist',
    route: '/create-playlist',
    Icon: MdAdd,
  },
  {
    label: 'Liked Songs',
    route: '/liked-songs',
    Icon: MdFavorite,
  },
]

export const Navigation: FC = () => {
  return (
    <nav className="space-y-8">
      <ul className="space-y-2 font-medium">
        {primaryNav.map(({ label, route, Icon }) => (
          <li key={label}>
            <Link
              href={route}
              className="flex items-center text-gray-500 hover:bg-gray-300 transition duration-75 hover:text-gray-900 group p-2"
            >
              <Icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="space-y-2 font-medium">
        {secondaryNav.map(({ label, route, Icon }) => (
          <li key={label}>
            <Link
              href={route}
              className="flex items-center text-gray-500 hover:bg-gray-300 transition duration-75 hover:text-gray-900 group p-2"
            >
              <Icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
