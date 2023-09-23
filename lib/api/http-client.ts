import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const httpClient = {
  get: async <T>(...args: Parameters<typeof axiosInstance.get>) =>
    axiosInstance.get<T>(...args).then((res) => res.data),
  post: async <T>(...args: Parameters<typeof axiosInstance.post>) =>
    axiosInstance.post<T>(...args).then((res) => res.data),
  put: async <T>(...args: Parameters<typeof axiosInstance.post>) =>
    axiosInstance.post<T>(...args).then((res) => res.data),
  delete: async <T>(...args: Parameters<typeof axiosInstance.post>) =>
    axiosInstance.post<T>(...args).then((res) => res.data),
}
