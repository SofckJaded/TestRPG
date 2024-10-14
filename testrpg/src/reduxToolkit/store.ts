import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { combatReducer } from "./slices/combat/combatSlice"
import { itemsReducer } from "./slices/items/itemsSlice"
import { skillsReducer } from "./slices/skills/skillsSlice"
import { userReducer } from "./slices/user/userSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        userSkills: skillsReducer,
        userItems: itemsReducer,
        combat: combatReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
