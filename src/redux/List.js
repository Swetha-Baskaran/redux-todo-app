import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : [] ,
}

export const List = createSlice({
    name: "list",
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        deleteAll: (state) => {
            state.value = []
        },
        Delete: (state, action) => {
            state.value = [...state.value.slice(0, action.payload), ...state.value.slice(action.payload + 1, state.value.length)]
        },
        updateStatus: (state, action) => {
            state.value[action.payload].status = (state.value[action.payload].status === "pending" ? "completed" : "pending") 
            state.value = [...state.value]
        },
        edit: (state, action) => {
            state.value[action.payload.index] = action.payload.value 
            state.value = [...state.value]
        }
    }
})

export const { add, Delete, deleteAll, updateStatus, edit } = List.actions
export default List.reducer