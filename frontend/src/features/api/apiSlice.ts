import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    // baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        // getTodos: builder.query({
        //     query: () => '/todos',
        //     // transformResponse: res => res.sort((a, b) => b.id - a.id),
        //     providesTags: ['Todos']
        // }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: userData
            }),
            invalidatesTags: ['Users']
        }),
        // updateTodo: builder.mutation({
        //     query: (todo) => ({
        //         url: `/todos/${todo.id}`,
        //         method: 'PATCH',
        //         body: todo
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
        // deleteTodo: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/todos/${id}`,
        //         method: 'DELETE',
        //         body: id
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
    })
})

export const {
    // useGetTodosQuery,
    useRegisterUserMutation,
    // useUpdateTodoMutation,
    // useDeleteTodoMutation
} = apiSlice