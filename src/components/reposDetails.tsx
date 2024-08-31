/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { ScrollArea } from './ui/scroll-area'

interface RepostDetails {
  username: string
}

export function ReposDetails({ username }: RepostDetails) {
  const [repos, setRepos] = useState<any[]>([])

  async function fetchRepos(username: string) {
    const response = await api.get(`${username}/repos`)
    setRepos(response.data)
  }

  useEffect(() => {
    fetchRepos(username)
  }, [username])

  return (
    <DialogContent className="h-3/4	w-3/2 rounded-md border">
      <DialogHeader>
        <DialogTitle>Repositories de {username}</DialogTitle>
      </DialogHeader>

      <ScrollArea className="p-2">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repositories</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {repos.map((repo) => {
                return (
                  <TableRow key={repo.id}>
                    <TableCell>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="font-mono"
                        rel="noreferrer"
                      >
                        {repo.name}
                      </a>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </DialogContent>
  )
}
