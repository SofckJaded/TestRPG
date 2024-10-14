import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchEquipItem } from "../../../http/itemApi"
import { Status } from "../user/types"
import { FetchEquipItem, Item, ItemsSliceState } from "./types"

export const equipItemAsync = createAsyncThunk("skill/equipItemAsync", async (params: FetchEquipItem) => {
    const { _id, active } = params
    const data = await fetchEquipItem(_id, active)
    return data
})

const initialState: ItemsSliceState = {
    userItems: [],
    status: Status.PENDING
}

const itemsSlice = createSlice({
    name: "userItems",
    initialState,
    reducers: {
        initItems: (state, action: PayloadAction<Item[]>) => {
            state.userItems = action.payload
        },
        itemsLogout: (state) => {
            state.userItems = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(equipItemAsync.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(equipItemAsync.fulfilled, (state, action) => {
            const { _id, active } = action.payload
            state.status = Status.LOADED
            state.userItems.forEach((i) => (i._id === _id ? (i.active = active) : i))
            return state //state.userItems.userItems
        })
        builder.addCase(equipItemAsync.rejected, (state) => {
            state.status = Status.ERROR
        })
    }
})

export const itemsReducer = itemsSlice.reducer
export const { initItems, itemsLogout } = itemsSlice.actions
