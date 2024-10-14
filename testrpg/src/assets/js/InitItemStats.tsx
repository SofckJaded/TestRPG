import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Item } from "../../reduxToolkit/slices/items/types"
import {
    setItemAgility,
    setItemArmor,
    setItemBAS,
    setItemBonusDamage,
    setItemHpRegen,
    setItemInt,
    setItemManaRegen,
    setItemSpellAmp,
    setItemStrength
} from "../../reduxToolkit/slices/user/userSlice"
import { RootState } from "../../reduxToolkit/store"

const InitItemStats = () => {
    const dispatch = useDispatch()
    const userItems = useSelector((state: RootState) => state.userItems.userItems)
    let userActiveItems = []

    const getActiveItems = () => {
        userActiveItems = userItems.filter((item) => item.active === true)
        setDamageBonus(userActiveItems)
        setHpRegen(userActiveItems)
        setManaRegen(userActiveItems)
        setAgility(userActiveItems)
        setIntelligence(userActiveItems)
        setStrength(userActiveItems)
        setSpellAmp(userActiveItems)
        setArmor(userActiveItems)
        setBonusAttackSpeed(userActiveItems)
    }

    const setAgility = (activeItems: Item[]) => {
        const agility = activeItems.filter((item) => item.agility)
        if (agility) {
            const amount = agility.reduce((total, b) => {
                return total + b.agility!
            }, 0)
            dispatch(setItemAgility(amount))
        }
    }

    const setIntelligence = (activeItems: Item[]) => {
        const intelligence = activeItems.filter((item) => item.intelligence)
        if (intelligence) {
            const amount = intelligence.reduce((total, b) => {
                return total + b.intelligence!
            }, 0)
            dispatch(setItemInt(amount))
        }
    }

    const setStrength = (activeItems: Item[]) => {
        const strength = activeItems.filter((item) => item.strength)
        if (strength) {
            const amount = strength.reduce((total, b) => {
                return total + b.strength!
            }, 0)
            dispatch(setItemStrength(amount))
        }
    }

    const setDamageBonus = (activeItems: Item[]) => {
        const bonusDamage = activeItems.filter((item) => item.bonusDamage)
        if (bonusDamage) {
            const amount = bonusDamage.reduce((total, b) => {
                return total + b.bonusDamage!
            }, 0)
            dispatch(setItemBonusDamage(amount))
        }
    }

    const setHpRegen = (activeItems: Item[]) => {
        const hpRegen = activeItems.filter((item) => item.hpRegen)
        if (hpRegen) {
            const amount = hpRegen.reduce((total, h) => {
                return total + h.hpRegen!
            }, 0)
            dispatch(setItemHpRegen(amount))
        }
    }

    const setManaRegen = (activeItems: Item[]) => {
        const manaRegen = activeItems.filter((item) => item.manaRegen)
        if (manaRegen) {
            const amount = manaRegen.reduce((total, h) => {
                return total + h.manaRegen!
            }, 0)
            dispatch(setItemManaRegen(amount))
        }
    }

    const setSpellAmp = (activeItems: Item[]) => {
        const spellAmp = activeItems.filter((item) => item.spellAmp)
        if (spellAmp.length) {
            const amount = spellAmp.reduce((total, h) => {
                return total + h.spellAmp!
            }, 0)
            dispatch(setItemSpellAmp(amount))
        }
    }

    const setArmor = (activeItems: Item[]) => {
        const armor = activeItems.filter((item) => item.armor)
        if (armor.length) {
            const amount = armor.reduce((total, h) => {
                return total + h.armor!
            }, 0)
            dispatch(setItemArmor(amount))
        }
    }

    const setBonusAttackSpeed = (activeItems: Item[]) => {
        const bonusAttackSpeed = activeItems.filter((item) => item.attackSpeed)
        if (bonusAttackSpeed) {
            const amount = bonusAttackSpeed.reduce((total, h) => {
                return total + h.attackSpeed!
            }, 0)
            dispatch(setItemBAS(amount))
        }
    }

    useEffect(() => {
        getActiveItems()
    }, [])

    return <></>
}

export default InitItemStats
