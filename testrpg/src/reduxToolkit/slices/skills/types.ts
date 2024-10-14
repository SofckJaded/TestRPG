import { Status } from "../user/types"

export type FetchEquipSkill = {
    skillId: number
    active: boolean
}

type SkillAttrs = Record<string, number>

export type Skill = {
    id: number
    title: string
    description: string
    rarity: string
    icon: string
    damageType: string
    active: boolean
    passive?: boolean
    ultimate?: boolean
    attrs1?: SkillAttrs[]
    attrs2?: SkillAttrs[]
    attrs3?: SkillAttrs[]
    attrs4?: SkillAttrs[]
    lvl?: number
}

export interface SkillSliceState {
    userSkills: Skill[]
    status: Status
}
