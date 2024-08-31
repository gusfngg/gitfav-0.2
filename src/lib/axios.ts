import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com/users',
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return config
  })
}
