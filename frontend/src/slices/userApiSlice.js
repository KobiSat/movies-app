import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { USER_URL } from "./urlConstartains"
import { apiSlice } from "./apiSlice"
import { query } from "express"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers: builder.query({
            query: () => ({
                url: USER_URL
            }),
            keepUnusedDataFor:5,
        }),
        getUserById: builder.query({
            query:(userId)=>({
                url: `${USER_URL}/${userId}`
            }),
            keepUnusedDataFor:5,
            providesTags: ["Users"]
        }),
        // addUser: builder.mutation({
        //     query:(data)=>({
        //         url: '/users',
        //         metod:'POST',
        //         body: data
        //     })
        // }),
        // deleteUser: builder.mutation({
        //     query:(userId)=>({
        //         url: `/users/${userId}`,
        //         metod:'DELETE',
        //     })
        // }),
        // editUser: builder.mutation({
        //     query:(userId, data)=>({
        //         url: `/users/${userId}`,
        //         metod:'PATCH',
        //         body: data
        //     })
        // })
        // apiLogin:,
        // apiLogout:,
        register: builder.mutation({
            query: (data)=> ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})
export const {useGetUsersQuery, useGetUserByIdQuery, /*useAddUserMutation, useDeleteUserMutation, useEditUserMutation*/ useRegisterMutation} = userApiSlice