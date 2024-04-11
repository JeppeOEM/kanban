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
    console.log(data)
    const response = await axiosInstance.post<T>(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to post data to ${url}. ${error.message}`)
  }
}

export const del = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(url)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to delete data at ${url}. ${error.message}`)
  }
}

export const put = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to update data at ${url}. ${error.message}`)
  }
}
