import { $authHost } from "./index"

export const fetchEquipSkill = async (skillId: number, active: boolean) => {
    const { data } = await $authHost.post<{ skillId: number; active: boolean }>("api/skill/equipskill", {
        skillId,
        active
    })
    return data
}

export const adminUpdateSkills = async (
    userId: string,
    rawSkills: { skillId: number; lvl: number; active: boolean }[]
) => {
    await $authHost.post("/api/skill/adminUpdateSkills", { userId, rawSkills })
}
