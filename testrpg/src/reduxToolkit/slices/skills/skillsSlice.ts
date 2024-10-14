import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchEquipSkill } from "../../../http/skillApi"
import { Status } from "../user/types"
import { FetchEquipSkill, SkillSliceState } from "./types"

export const equipSkillAsync = createAsyncThunk("skill/equipSkillAsync", async (params: FetchEquipSkill) => {
    const { skillId, active } = params
    const data = await fetchEquipSkill(skillId, active)
    return data
})

const initialState: SkillSliceState = {
    userSkills: [],
    status: Status.PENDING
}

const skillsSlice = createSlice({
    name: "userSkills",
    initialState,
    reducers: {
        initSkills: (state, action) => {
            state.userSkills = action.payload
        },
        skillsLogout: (state) => {
            state.userSkills = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(equipSkillAsync.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(equipSkillAsync.fulfilled, (state, action) => {
            const { skillId, active } = action.payload
            state.status = Status.LOADED
            state.userSkills.forEach((i) => (i.id === skillId ? (i.active = active) : i))
            return state
        })
        builder.addCase(equipSkillAsync.rejected, (state) => {
            state.status = Status.ERROR
        })
    }
})

export const skillsReducer = skillsSlice.reducer
export const { initSkills, skillsLogout } = skillsSlice.actions
