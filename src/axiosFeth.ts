

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000' 
})


export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to fetch data from ${url}. ${error.message}`)
  }
}


export const post = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to post data to ${url}. ${error.message}`)
  }
}
