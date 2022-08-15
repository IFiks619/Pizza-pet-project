import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { currentPage, linkSort, linkCategory } = params
    const { data } = await axios.get(`https://62c580d6134fa108c25455db.mockapi.io/items?page=${currentPage}&limit=4&${linkSort}&${linkCategory}`)
    return data
})

const initialState = {
    items: [],
    status: 'loading', //error | success | loading 
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    // Async actions, keys ...
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer