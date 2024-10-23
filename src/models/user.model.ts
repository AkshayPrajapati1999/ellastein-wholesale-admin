import { parseCookies } from 'nookies'
import { CookieKeys } from './cookie.model'

export interface IUser {
  customerCode: string
  storeName: string
  userEmail: string
  userId: string
  userName: string
  userRole: UserRoles
}

export enum UserRoles {
  SALES_AGENT = 'SalesAgent',
  ADMIN = 'Admin',
  RETAILER = 'RetailUser'
}

export interface ISalesAgentUsersList {
  userId: string
  storeName: string
  email: string
}

export interface ISaleChanneList {
  id: number
  name: string
}

export interface ICustomerCategory {
  categoryId: number
  categoryName: string
}

export interface ISubCustomerCategory {
  categoryId: number
  subCategoryId: number
  subCategoryName: string
}

export interface IProductionOption {
  id: number
  name: string
}

export interface IStoreType {
  id: number
  name: string
}

export interface ICatalog {
  id: number
  name: string
  path: string
}

export function isUserLoggedIn(): boolean {
  const cookies = parseCookies()

  return cookies && cookies[CookieKeys.USER_DETAIL] ? true : false
}
