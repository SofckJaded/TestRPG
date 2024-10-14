import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { skills } from "../../components/Game/main/Skills/allSkills"
import { allItems } from "../../components/Game/main/Inventory/allItems"
import { initSkills } from "../../reduxToolkit/slices/skills/skillsSlice"
import { initItems } from "../../reduxToolkit/slices/items/itemsSlice"
import { RootState } from "../../reduxToolkit/store"
import { Skill } from "../../reduxToolkit/slices/skills/types"
import { Item } from "../../reduxToolkit/slices/items/types"

export const InitUser = () => {
    let user = useSelector((state: RootState) => state.user.data)
    const skill = useSelector((state: RootState) => state.userSkills.userSkills)
    const userItems = useSelector((state: RootState) => state.userItems.userItems)
    const allGameItems = [...allItems]
    const allSkills = [...skills]
    const dispatch = useDispatch()

    let userAllSkills: Skill[] = []
    let skillsFinal: Skill[] = []
    let activeSkills: Skill[] = []
    let userAllItems: Item[] = []
    let items: Item[] = []

    const getItems = () => {
        if (userAllItems.length === 0) {
            user.items?.forEach((u) => {
                let item = allGameItems.find((i) => i.id === u.itemId)
                //@ts-ignore
                userAllItems.push({ ...item })
            })
        }
    }

    const noDuplicateActiveItems = () => {
        items = userAllItems.map((item, index) => {
            return {
                ...item,
                _id: (item._id = user.items![index]._id),
                active: (item.active = user.items![index].active)
                // amount: (item.amount = user.items[index].amount)
            }
        })
    }

    getItems()
    noDuplicateActiveItems()

    const getSkills = () => {
        if (!user.skills?.length) {
            return false
        }
        const copySkills = JSON.parse(JSON.stringify(allSkills))

        //@ts-ignore
        userAllSkills = copySkills.filter((skill) => user.skills.some((s) => s.skillId === skill.id))

        userAllSkills.forEach((p) => {
            user.skills?.forEach((s) => {
                if (p.id === s.skillId) {
                    if (s.lvl === 1) {
                        delete p.attrs2
                        delete p.attrs3
                        delete p.attrs4
                    } else if (s.lvl === 2) {
                        delete p.attrs1
                        delete p.attrs3
                        delete p.attrs4
                    } else if (s.lvl === 3) {
                        delete p.attrs1
                        delete p.attrs2
                        delete p.attrs4
                    } else if (s.lvl === 4) {
                        delete p.attrs1
                        delete p.attrs2
                        delete p.attrs3
                    }
                }
            })
        })
    }
    const getActiveSkills = () => {
        if (!user.skills?.length) {
            return false
        }
        //@ts-ignore
        activeSkills = user.skills.filter((skill) => skill.active === true)

        skillsFinal = JSON.parse(JSON.stringify(userAllSkills))
        skillsFinal //@ts-ignore
            .filter((skill) => activeSkills.some((s) => s.skillId === skill.id))
            .forEach((v) => {
                v.active = true
            })
    }
    getSkills()

    getActiveSkills()

    if (!skill.length) {
        dispatch(initSkills(skillsFinal))
    }

    if (!userItems.length) {
        dispatch(initItems(items))
    }

    return <div></div>
}
