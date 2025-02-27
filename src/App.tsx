import { ModeToggle } from './components/theme/mode-toggle'
import { Button } from './components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import './global.css'
import { Input } from './components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from './lib/axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { UsersTableRow } from './components/usersTableRow'
import { AxiosError } from 'axios'

const fetchUserSchema = z.object({
  username: z.string(),
})

export interface User {
  name: string
  username: string
  repos: number
  followers: number
}

type UsernameSchema = z.infer<typeof fetchUserSchema>

export function App() {
  const [users, setUsers] = useState<User[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(fetchUserSchema),
  })

  async function fetchUser({ username }: UsernameSchema) {
    try {
      const { data } = await api.get(`/${username}`)
      const { name, login, public_repos: repos, followers } = data

      const newUser = {
        name,
        username: login,
        repos,
        followers,
      }

      const userExists = users.some(
        (user) => user.username === newUser.username,
      )

      // Adiciona o usuário se ele não existir
      if (!userExists) {
        setUsers((state) => [newUser, ...state])
        toast.success('Usuario adicionado.')
      } else {
        toast.error('Usuário já adicinado!')
      }
    } catch (e) {
      const error = e as AxiosError

      if (error.request.error === 404) {
        toast.error('Usuário não encontrado')
      }

      if (error.request.error === 403) {
        toast.error('Acesso negado. Aguarde um tempinho.')
      }
    }

    reset()
  }

  async function deletedUser(login: string) {
    const userWithoudDeleteOne = users.filter((user) => {
      return user.username !== login
    })

    toast.info('Usuario deletado.')
    setUsers(userWithoudDeleteOne)
  }

  return (
    <>
      <div className="p-10">
        <ModeToggle />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1120px] p-5 border-[2px] border-zinc-400 rounded-md dark:border-zinc-800">
          <div className="flex items-center justify-between h-12">
            <h1 className="text-2xl font-mono font-bold">GitStar</h1>

            <form
              onSubmit={handleSubmit(fetchUser)}
              className="flex items-center gap-3 "
            >
              <Input
                placeholder="Digite o username"
                {...register('username')}
              />
              <Button
                className="disabled:hover:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Favoritar!
              </Button>
            </form>
          </div>

          <div className="rounded-md border mt-10 border-zinc-400 dark:border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[500px]">Usuário</TableHead>
                  <TableHead>Repositories</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Remover</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => {
                  return (
                    <UsersTableRow
                      key={user.username}
                      dataUser={user}
                      deletedUser={() => deletedUser(user.username)}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
