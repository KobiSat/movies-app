import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { TASK_URL } from "./urlConstartains"
import { apiSlice } from "./apiSlice"

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getTasks: builder.query({
            query:()=>TASK_URL
        }),
        getTaskById: builder.query({
            query:(todoId)=>({
                url: `${TASK_URL}/${todoId}`
            })
        }),
        addTask: builder.mutation({
            query:(data)=>({
                url: TASK_URL,
                metod:'POST',
                body: data
            })
        }),
        deleteTask: builder.mutation({
            query:(taskId)=>({
                url: `${TASK_URL}/:${taskId}`,
                metod:'DELETE',
            })
        }),
        editTask: builder.mutation({
            query:(taskId, data)=>({
                url: `${TASK_URL}/:${taskId}`,
                metod:'PATCH',
                body: data
            })
        })
    })
})
export const {useGetTasksQuery, useGetTaskByIdQuery, useAddTaskMutation, useDeleteTaskMutation, useEditTaskMutation} = todoApiSlice