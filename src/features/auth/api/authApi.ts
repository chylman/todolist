import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseResponse } from '@/common/types'
import { LoginInputs } from '@/features/auth/lib/schemas/loginSchema.ts'
import { baseApi } from '@/app/baseApi.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<
      BaseResponse<{ id: number; email: string; login: string }>,
      void
    >({
      query: () => 'auth/me',
    }),
    login: builder.mutation<
      BaseResponse<{ id: number; token: string }>,
      LoginInputs
    >({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<BaseResponse<{}>, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
