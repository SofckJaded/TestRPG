import { Status } from "../user/types"

export type FetchEquipItem = {
    _id: string
    active: boolean
}

// export type fetchItemAdd = {
//     itemId: number
//     active: boolean
//     _id: string
// }

export type Item = {
    id: number
    _id?: string
    title: string
    type: string
    description: string
    rarity: string
    passive: boolean
    icon: string
    nonCombat?: boolean
    stack: boolean
    price: number
    active: boolean
    manaRestored?: number
    healthRestored?: number
    amount?: number
    hpRegen?: number
    coolDown?: number
    manaCost?: number
    duration?: number
    manaRegen?: number
    strength?: number
    agility?: number
    intelligence?: number
    craftTo?: number[]
    requires?: number[]
    recipe?: number
    spellAmp?: number
    armor?: number
    attackSpeed?: number
    bonusDamage?: number
    craftAdded?: string
    craft?: boolean
}

export interface ItemsSliceState {
    userItems: Item[]
    status: Status
}
