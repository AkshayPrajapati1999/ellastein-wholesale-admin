import axios from 'axios'
import { parseCookies } from 'nookies'
import { CookieKeys } from 'src/models/cookie.model'
import { environment } from 'src/service/env'

const axiosInstance = axios.create({
  baseURL: environment.baseUrl
})
axiosInstance.interceptors.request.use(
  config => {
    const cookies = parseCookies()
    const userData = cookies[CookieKeys.USER_TOKEN]
    if (userData) {
      config.headers['Authorization'] = 'Bearer ' + userData
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)
export default axiosInstance
