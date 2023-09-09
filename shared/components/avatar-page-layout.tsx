import { FC } from 'react'

interface AvatarPageLayoutProps {
  avatarSlot: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
  color: keyof typeof colorMap
  detailSlot?: React.ReactNode
}

export const AvatarPageLayout: FC<AvatarPageLayoutProps> = ({
  children,
  title,
  subtitle,
  detailSlot,
  color,
  avatarSlot,
}) => {
  return (
    <div
      className={`flex flex-col bg-gradient-to-b h-screen from-${color}-500 from-15% via-${color}-700 via-45% to-black to-75%`}
    >
      <div className="flex-1">
        <div className="flex space-x-5 items-end p-10">
          <div className="relative h-40 w-40">{avatarSlot}</div>
          <div className="flex flex-col space-y-5">
            <h5 className="uppercase font-bold text-white text-sm">
              {subtitle}
            </h5>
            <h1 className="font-bold text-white text-7xl">{title}</h1>
            {detailSlot}
          </div>
        </div>
      </div>
      <div className="p-10 flex-2 bg-black bg-opacity-10">{children}</div>
    </div>
  )
}

const colorMap = {
  gray: 'from-gray-500 via-gray-700',
  red: 'from-red-500 via-red-700',
  yellow: 'from-yellow-500 via-yellow-700',
  green: 'from-green-500 via-green-700',
  blue: 'from-blue-500 via-blue-700',
  indigo: 'from-indigo-500 via-indigo-700',
  purple: 'from-purple-500 via-purple-700',
  pink: 'from-pink-500 via-pink-700',
}
