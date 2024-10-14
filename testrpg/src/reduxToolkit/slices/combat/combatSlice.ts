import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../user/types"
import { CombatSliceState, Enemy, LogMessage } from "./types"

const initialState: CombatSliceState = {
    enemy: null!,
    status: Status.PENDING,
    fightStatus: false,
    logMessages: []
}

const combatSlice = createSlice({
    name: "combat",
    initialState,
    reducers: {
        initEnemy: (state, action: PayloadAction<Enemy>) => {
            state.enemy = action.payload
        },
        setFightStatus: (state, action: PayloadAction<boolean>) => {
            state.fightStatus = action.payload
        },
        setLogMessages: (state, action: PayloadAction<LogMessage>) => {
            state.logMessages.push(action.payload)
        },
        combatHandDamage: (state, action: PayloadAction<number>) => {
            state.enemy.currentHp -= action.payload
        }
    }
})

export const { initEnemy, setFightStatus, setLogMessages, combatHandDamage } = combatSlice.actions
export const combatReducer = combatSlice.reducer
