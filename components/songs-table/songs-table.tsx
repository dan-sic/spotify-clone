import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Song as SongModel } from '@prisma/client'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FC } from 'react'
import { formatDate, formatSecondsToTime } from './utils'

type Song = Pick<SongModel, 'id' | 'name' | 'duration'> & { createdAt: string }

interface SongsTableProps {
  songs: Song[]
}

const columnHelper = createColumnHelper<Song>()

const columns = [
  columnHelper.display({
    id: 'id',
    header: `#`,
    cell: (data) => `${data.row.index + 1}`,
    size: 20,
  }),
  columnHelper.accessor('name', {
    header: () => <span>Title</span>,
    cell: (data) => <span className="text-gray-100">{data.getValue()}</span>,
    size: 500,
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Date Added',
    cell: (data) => <span>{formatDate(data.getValue())}</span>,
    size: 200,
  }),
  columnHelper.accessor('duration', {
    header: () => 'Duration',
    cell: (data) => <span>{formatSecondsToTime(data.getValue())}</span>,
    size: 100,
  }),
]

export const SongsTable: FC<SongsTableProps> = ({ songs }) => {
  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="hover:bg-transparent" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            className="border-none text-gray-400 hover:bg-gray-100/25"
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
