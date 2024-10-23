import { AsyncThunk, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setCookie } from 'nookies'
import axiosInstance from 'src/axiosIntersepter/axiosIntersepter'
import { ApiRoutes } from 'src/models/common.enum'
import { CookieKeys } from 'src/models/cookie.model'
import { IUser, UserRoles } from 'src/models/user.model'
import { environment } from 'src/service/env'

interface UserLoginRequest {
  email: string
  password: string
}

interface UserLoginResponse {
  accessToken: string
  customerCode: string
  storeName: string
  userEmail: string
  userId: string
  userName: string
  userRole: UserRoles
}

type UserLoginThunk = AsyncThunk<any, any, any>

// type UserLoginThunk = AsyncThunk<UserLoginResponse, UserLoginRequest, { rejectValue: string }>;

export const userLogin: UserLoginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserLoginRequest, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response: AxiosResponse<UserLoginResponse> = await axiosInstance.post(
        `${environment.baseUrl}${ApiRoutes.Login}`,
        { email, password },
        config
      )

      const userData: IUser = {
        userRole: response.data.userRole,
        userId: response.data.userId,
        customerCode: response.data.customerCode,
        storeName: response.data.storeName,
        userEmail: response.data.userEmail,
        userName: response.data.userName
      }

      // setCookie(null, 'userData', response.data.accessToken)
      // setCookie(null, 'userRole', JSON.stringify(response.data.userRole))

      setCookie(null, CookieKeys.USER_TOKEN, response.data.accessToken)
      setCookie(null, CookieKeys.USER_ROLE, response.data.userRole)
      setCookie(null, CookieKeys.USER_NAME, response.data.storeName)
      setCookie(null, CookieKeys.USER_DETAIL, JSON.stringify(userData))

      return response.data
    } catch (error: any) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        }

        return rejectWithValue('An error occurred during the login request.')
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const logout = createAction('auth/logout')
