import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://codeflow-ujkh.onrender.com',
    credentials: 'include',
  }),
  tagTypes: ['myCodes', 'allCodes'],
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query: (fullCode) => ({
        url: '/compiler/save',
        method: 'POST',
        body: fullCode,
      }),
      invalidatesTags: ['myCodes', 'allCodes'],
    }),
    loadCode: builder.mutation({
      query: ({ urlId }) => ({
        url: '/compiler/load',
        method: 'POST',
        body: { urlId },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: '/user/signup',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({ url: '/user/user-details', cache: 'no-store' }),
    }),
    getMyCodes: builder.query({
      query: () => '/user/my-codes',
      providesTags: ['myCodes'],
    }),
    deleteCode: builder.mutation({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['myCodes', 'allCodes'],
    }),
    editCode: builder.mutation({
      query: ({ fullCode, id }) => ({
        url: `/compiler/edit/${id}`,
        method: 'PUT',
        body: fullCode,
      }),
    }),
    getAllCodes: builder.query({
      query: () => ({
        url: '/compiler/get-all-codes',
        cache: 'no-store',
      }),
      providesTags: ['allCodes'],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;
