import { Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

import { User } from '@/App'
import { Dialog, DialogTrigger } from './ui/dialog'
import { ReposDetails } from './reposDetails'

interface DataUserProps {
  dataUser: User
  deletedUser: () => void
}

export function UsersTableRow({ dataUser, deletedUser }: DataUserProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <img
            src={`https://github.com/${dataUser.username}.png`}
            alt=""
            className="h-[56px] w-[56px] rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-lg">{dataUser.name}</h3>
            <span className="text-zinc-700 text-base dark:text-zinc-300 font-mono">
              /{dataUser.username}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <ReposDetails username={dataUser.username} />
        </Dialog>
      </TableCell>
      <TableCell className="font-semibold text-base">
        {dataUser.followers}
      </TableCell>
      <TableCell className="font-semibold text-base">
        <Button onClick={deletedUser} variant="outline" size="xs">
          <X className="text-red-500 h-4 w-4" />
          <span className="sr-only">Remover usúario.</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
