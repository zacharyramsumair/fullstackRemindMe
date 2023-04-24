import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// export interface IUserState {
//   value: number
// }

const initialState = {
    // const initialState: CounterState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : "zack"
}



export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            localStorage.removeItem("user")
            state.user = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer