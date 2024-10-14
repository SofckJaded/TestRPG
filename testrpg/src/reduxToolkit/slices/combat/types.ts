import { Status } from "../user/types"

export type LogMessage = {
    icon: string
    text: string
}

export type Enemy = {
    id: number
    name: string
    type: string
    description: string
    img: string
    stage: number
    totalHp: number
    totalMana?: number
    manaRegen?: number
    currentHp: number
    hpRegen: number
    attackSpeed: number
    currentMana?: number
    damage: number
    armor: number
    skills?: number[]
    items?: number[]
}

export interface CombatSliceState {
    enemy: Enemy
    status: Status
    fightStatus: boolean
    logMessages: LogMessage[]
}
