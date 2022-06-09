import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList: [],
    orderList: [],
    income: [],
    userError: null,
    orderError: null,
    earningData: null
}

export const productNOrder = createSlice({
    name: 'ProductNOrder',
    initialState,
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload[0]
            state.income = action.payload[1]
        },
        setUserError: (state, action) => {
            state.userError = action.payload
        },
        setOrderError: (state, action) => {
            state.orderError = action.payload
        },
        setIncome: (state, action) => {
            state.income = action.payload
        },
        setEarningData: (state, action) => {
            state.earningData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserList, setOrderList, setOrderError, setUserError, setIncome,setEarningData } = productNOrder.actions

export default productNOrder.reducer