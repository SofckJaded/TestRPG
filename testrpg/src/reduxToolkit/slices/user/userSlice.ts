import { fetchRemoveItemAsync, fetchAddItemAsync } from "./../../../http/itemApi"
import { RootState } from "./../../store"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { login, auth, registration, setStat } from "../../../http/userApi"
import { UserSliceState, Status, fetchAuthArgs, fetchRegArgs, fetchSetStatArgs, itemItem } from "./types"

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params: fetchAuthArgs) => {
    const { email, password } = params
    const data = await login(email, password)
    return data
})

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params: fetchRegArgs) => {
    const { email, login, attr, password } = params
    const data = await registration(email, login, attr, password)
    return data
})

export const fetchAuthSet = createAsyncThunk("auth/fetchAuthSet", async () => {
    const data = await auth()
    return data
})

export const setCurrentHpAsync = createAsyncThunk("user/setCurrentHpAsync", async (params: string) => {
    const data = params
    return data
})

export const setCurrentManaAsync = createAsyncThunk("user/setCurrentManaAsync", async (params: string) => {
    const data = params
    return data
})

export const fetchSetStat = createAsyncThunk("user/setStatAsync", async (params: fetchSetStatArgs) => {
    const { stat, value } = params
    const data = await setStat(stat, value)
    return data
})

export const fetchAddItem = createAsyncThunk("user/addItemAsync", async (params: itemItem) => {
    const data = await fetchAddItemAsync(params)
    return data
})

export const fetchRemoveItem = createAsyncThunk("user/removeItemAsync", async (params: itemItem) => {
    const data = await fetchRemoveItemAsync(params)
    return data
})

const initialState: UserSliceState = {
    data: null!,
    status: Status.PENDING,
    hpStatus: Status.PENDING,
    manaStatus: Status.PENDING
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null!
            state.status = Status.LOGOUT
            state.hpStatus = Status.LOGOUT
            state.manaStatus = Status.LOGOUT
        },
        initHp: (state, action: PayloadAction<number>) => {
            state.data.totalHp = action.payload
        },
        initBaseHpRegen: (state, action: PayloadAction<number>) => {
            state.data.baseHpRegen = action.payload
        },
        initBaseArmor: (state, action: PayloadAction<number>) => {
            state.data.baseArmor = action.payload
        },
        initAttackSpeed: (state, action: PayloadAction<number>) => {
            state.data.attackSpeed = action.payload
        },
        initBSA: (state, action: PayloadAction<number>) => {
            state.data.baseAttackSpeed = action.payload
        },
        initWhiteDamage: (state, action: PayloadAction<number>) => {
            state.data.whiteDamage = action.payload
        },
        initMana: (state, action: PayloadAction<number>) => {
            state.data.totalMana = action.payload
        },
        initBaseManaRegen: (state, action: PayloadAction<number>) => {
            state.data.baseManaRegen = action.payload
        },
        setItemAgility: (state, action: PayloadAction<number>) => {
            state.data.agility += action.payload
        },
        removeItemAgility: (state, action: PayloadAction<number>) => {
            state.data.agility -= action.payload
        },
        setItemInt: (state, action: PayloadAction<number>) => {
            state.data.intelligence += action.payload
        },
        removeItemInt: (state, action: PayloadAction<number>) => {
            state.data.intelligence -= action.payload
        },
        setItemStrength: (state, action: PayloadAction<number>) => {
            state.data.strength += action.payload
        },
        removeItemStrength: (state, action: PayloadAction<number>) => {
            state.data.strength -= action.payload
        },
        setItemHpRegen: (state, action: PayloadAction<number>) => {
            state.data.hpRegen += action.payload
        },
        removeItemHpRegen: (state, action: PayloadAction<number>) => {
            state.data.hpRegen -= action.payload
        },
        setItemManaRegen: (state, action: PayloadAction<number>) => {
            state.data.manaRegen += action.payload
        },
        removeItemManaRegen: (state, action: PayloadAction<number>) => {
            state.data.manaRegen -= action.payload
        },
        setItemArmor: (state, action: PayloadAction<number>) => {
            state.data.armor += action.payload
        },
        removeItemArmor: (state, action: PayloadAction<number>) => {
            state.data.armor -= action.payload
        },
        setItemBAS: (state, action: PayloadAction<number>) => {
            state.data.bonusAttackSpeed += action.payload
        },
        removeItemBAS: (state, action: PayloadAction<number>) => {
            state.data.bonusAttackSpeed -= action.payload
        },
        setItemSpellAmp: (state, action: PayloadAction<number>) => {
            state.data.spellApm += action.payload
        },
        removeItemSpellAmp: (state, action: PayloadAction<number>) => {
            state.data.spellApm -= action.payload
        },
        setItemBonusDamage: (state, action: PayloadAction<number>) => {
            state.data.greenDamage += action.payload
        },
        removeItemBonusDamage: (state, action: PayloadAction<number>) => {
            state.data.greenDamage -= action.payload
        },
        setCurrentHp: (state, action: PayloadAction<string>) => {
            if (action.payload === "add") {
                state.data.currentHp += state.data.hpRegen + state.data.baseHpRegen
            } else if (action.payload === "set") {
                state.data.currentHp = state.data.totalHp
            }
        },
        setCurrentMana: (state, action: PayloadAction<string>) => {
            if (action.payload === "add") {
                state.data.currentMana += state.data.manaRegen + state.data.baseManaRegen
            } else if (action.payload === "set") {
                state.data.currentMana = state.data.totalMana
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = Status.LOADING
            state.data = null!
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = Status.LOADED
            state.data = action.payload
        })
        builder.addCase(fetchAuth.rejected, (state) => {
            state.status = Status.ERROR
            state.data = null!
        })
        /////////////////////////////////
        builder.addCase(fetchRegister.pending, (state) => {
            state.status = Status.LOADING
            state.data = null!
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = Status.LOADED
            state.data = action.payload
        })
        builder.addCase(fetchRegister.rejected, (state) => {
            state.status = Status.ERROR
            state.data = null!
        })
        /////////////////////////////////
        builder.addCase(fetchAuthSet.pending, (state) => {
            state.status = Status.LOADING
            state.data = null!
        })
        builder.addCase(fetchAuthSet.fulfilled, (state, action) => {
            state.status = Status.LOADED
            state.data = action.payload
        })
        builder.addCase(fetchAuthSet.rejected, (state) => {
            state.status = Status.ERROR
            state.data = null!
        })
        /////////////////////////////////
        builder.addCase(setCurrentHpAsync.pending, (state) => {
            state.hpStatus = Status.LOADING
        })
        builder.addCase(setCurrentHpAsync.fulfilled, (state, action) => {
            state.hpStatus = Status.LOADED
            if (action.payload === "add") {
                state.data.currentHp += state.data.hpRegen + state.data.baseHpRegen
            } else if (action.payload === "set") {
                state.data.currentHp = state.data.totalHp
            }
        })
        builder.addCase(setCurrentHpAsync.rejected, (state) => {
            state.hpStatus = Status.ERROR
        })
        /////////////////////////////////
        builder.addCase(setCurrentManaAsync.pending, (state) => {
            state.manaStatus = Status.LOADING
        })
        builder.addCase(setCurrentManaAsync.fulfilled, (state, action) => {
            state.manaStatus = Status.LOADED
            if (action.payload === "add") {
                state.data.currentMana += state.data.manaRegen + state.data.baseManaRegen
            } else if (action.payload === "set") {
                state.data.currentMana = state.data.totalMana
            }
        })
        builder.addCase(setCurrentManaAsync.rejected, (state) => {
            state.manaStatus = Status.ERROR
        })
        /////////////////////////////////
        builder.addCase(fetchSetStat.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(fetchSetStat.fulfilled, (state, action) => {
            const { stat, value } = action.payload
            // @ts-ignore
            state.data[stat] = value
        })
        builder.addCase(fetchSetStat.rejected, (state) => {
            state.status = Status.ERROR
        })
        /////////////////////////////////
        builder.addCase(fetchAddItem.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(fetchAddItem.fulfilled, (state, action) => {
            state.data.items?.push(action.payload)
        })
        builder.addCase(fetchAddItem.rejected, (state) => {
            state.status = Status.ERROR
        })
        /////////////////////////////////
        builder.addCase(fetchRemoveItem.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(fetchRemoveItem.fulfilled, (state, action) => {
            const { _id } = action.payload
            state.data.items?.filter((item) => item._id !== _id)
        })
        builder.addCase(fetchRemoveItem.rejected, (state) => {
            state.status = Status.ERROR
        })
        /////////////////////////////////
    }
})

export const selectIsAuth = (state: RootState) => Boolean(state.user.data)
export const userReducer = userSlice.reducer
export const {
    logout,
    initHp,
    initBaseHpRegen,
    initAttackSpeed,
    initBSA,
    initBaseArmor,
    initBaseManaRegen,
    initMana,
    initWhiteDamage,
    setItemAgility,
    setItemInt,
    setItemStrength,
    setItemHpRegen,
    setItemManaRegen,
    setItemArmor,
    setItemBAS,
    setItemSpellAmp,
    setItemBonusDamage,
    setCurrentHp,
    setCurrentMana,
    removeItemBonusDamage,
    removeItemSpellAmp,
    removeItemBAS,
    removeItemArmor,
    removeItemManaRegen,
    removeItemHpRegen,
    removeItemAgility,
    removeItemInt,
    removeItemStrength
} = userSlice.actions
