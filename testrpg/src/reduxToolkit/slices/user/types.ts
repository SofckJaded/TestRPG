export type fetchAuthArgs = Record<string, string>
export type fetchRegArgs = Record<string, string>
export type fetchSetStatArgs = {
    stat: string
    value: number
}

export type skillItem = {
    skillId: number
    lvl: number
    active: boolean
}

export type itemItem = {
    itemId: number
    active: boolean
    _id?: string
}

export enum Status {
    PENDING = "pending",
    LOADING = "loading",
    LOADED = "loaded",
    ERROR = "error",
    LOGOUT = "logout"
}

export type User = {
    _id: string
    login: string
    email: string
    mainAttribute: string
    lvl: number
    exp: number
    locationLevel: number
    locationStage: number
    strength: number
    agility: number
    intelligence: number
    totalHp: number
    currentHp: number
    hpRegen: number
    baseHpRegen: number
    totalMana: number
    currentMana: number
    manaRegen: number
    baseManaRegen: number
    whiteDamage: number
    greenDamage: number
    armor: number
    baseArmor: number
    magicResistance: number
    statusResistance: number
    physicalResistance: number
    criticalHit: number
    evasion: number
    attackSpeed: number
    bonusAttackSpeed: number
    baseAttackSpeed: number
    spellApm: number
    skills?: skillItem[]
    items?: itemItem[]
    token: string
}

export interface UserSliceState {
    data: User
    status: Status
    hpStatus: Status
    manaStatus: Status
}
