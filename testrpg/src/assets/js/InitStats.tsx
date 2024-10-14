import React, { useEffect } from "react"
import { agilityBase } from "./baseStats/AgilityBase"
import { useDispatch, useSelector } from "react-redux"
import {
    initAttackSpeed,
    initBaseArmor,
    initBaseHpRegen,
    initBaseManaRegen,
    initBSA,
    initHp,
    initMana,
    initWhiteDamage
} from "../../reduxToolkit/slices/user/userSlice"
import { strengthBase } from "./baseStats/StrengthBase"
import { intelligenceBase } from "./baseStats/IntelligenceBase"
import { RootState } from "../../reduxToolkit/store"

const InitStats = () => {
    const user = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch()
    const agility = user.agility
    const intelligence = user.intelligence
    const strength = user.strength

    const setStrength = () => {
        const hp = strength * 20 + 200
        let hpRegen = strength * 0.1

        if (user.mainAttribute === "agility") {
            hpRegen += agilityBase.baseHpRegen
        }

        if (user.mainAttribute === "intelligence") {
            hpRegen += intelligenceBase.baseHpRegen
        }
        // const hpRegen =
        //     strength * 0.1 + user.mainAttribute === "agility"
        //         ? agilityBase.baseHpRegen
        //         : user.mainAttribute === "strength"
        //         ? strengthBase.baseHpRegen
        //         : intelligenceBase.baseHpRegen

        if (user.mainAttribute === "strength") {
            hpRegen += strengthBase.baseHpRegen
            const whiteDamage = strength * 1
            dispatch(initWhiteDamage(whiteDamage))
        }
        dispatch(initHp(hp))
        dispatch(initBaseHpRegen(+hpRegen.toFixed(1))) //+hpRegen.toFixed(1)
    }

    const setAgility = () => {
        const armor =
            user.mainAttribute === "agility"
                ? agility * 0.167 + agilityBase.baseArmor
                : user.mainAttribute === "strength"
                ? agility * 0.167 + strengthBase.baseArmor
                : agility * 0.167 + intelligenceBase.baseArmor

        const IAS = agility + user.bonusAttackSpeed
        const BAT =
            user.mainAttribute === "agility"
                ? agilityBase.baseAttackTime
                : user.mainAttribute === "strength"
                ? strengthBase.baseAttackTime
                : intelligenceBase.baseAttackTime
        const BAS =
            user.mainAttribute === "agility"
                ? agilityBase.baseAttackSpeed
                : user.mainAttribute === "strength"
                ? strengthBase.baseAttackSpeed
                : intelligenceBase.baseAttackSpeed
        const attackTime = ((BAS + IAS) * 0.01) / BAT
        const attackSpeed = 1 / attackTime

        if (user.mainAttribute === "agility") {
            const whiteDamage = agility + agilityBase.baseWhiteDamage
            dispatch(initWhiteDamage(whiteDamage))
        }
        dispatch(initBaseArmor(armor)) //Math.round(armor)
        dispatch(initBSA(BAS + IAS))
        dispatch(initAttackSpeed(+attackSpeed.toFixed(2)))
    }

    const setIntelligence = () => {
        const manaTotal = intelligence * 12 + 75
        const manaRegen = intelligence * 0.05

        dispatch(initMana(manaTotal))
        dispatch(initBaseManaRegen(+manaRegen.toFixed(1))) //+manaRegen.toFixed(1)

        if (user.mainAttribute === "intelligence") {
            const whiteDamage = agility + intelligenceBase.baseWhiteDamage
            dispatch(initWhiteDamage(whiteDamage))
        }
    }

    useEffect(() => {
        setStrength()
    }, [user.strength])
    useEffect(() => {
        setAgility()
    }, [user.agility, user.bonusAttackSpeed])
    useEffect(() => {
        setIntelligence()
    }, [user.intelligence])

    return <div></div>
}

export default InitStats
