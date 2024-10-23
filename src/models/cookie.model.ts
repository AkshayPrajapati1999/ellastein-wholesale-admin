import { parseCookies, setCookie } from 'nookies'

export const COOKIE_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000 // 30 DAYS

export enum CookieKeys {
  USER_TOKEN = 'userToken',
  USER_DETAIL = 'userDetail',
  USER_ROLE = 'userRole',
  SELECTED_RETAILER = 'selectedRetailer',
  USER_NAME = 'userName'
}

export const getCookie = (cookieKeys: CookieKeys) => {
  const cookies = parseCookies()

  return cookies[cookieKeys]
}

export const setCookies = (cookieKeys: CookieKeys, value: string) => {
  setCookie(null, cookieKeys, value, {
    COOKIE_EXPIRE_TIME
  })
}
