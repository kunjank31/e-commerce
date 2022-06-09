import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: false,
    user: null
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload
            if (state.user === null) {
                state.auth = false
            } else {
                state.auth = true
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer