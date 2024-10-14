import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EnemyList } from "../../components/Game/main/Combat/enemy/EnemyList"
import { initEnemy } from "../../reduxToolkit/slices/combat/combatSlice"
import { RootState } from "../../reduxToolkit/store"

export const InitEnemy = () => {
    const user = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch()
    const allEnemy = [...EnemyList]

    // const getCurrentEnemy = () => {}

    useEffect(() => {
        if (user.locationStage !== 10) {
            const enemy = allEnemy.find((en) => en.type === "creep")
            dispatch(initEnemy(enemy!))
        }
    }, [user.locationStage])

    return <></>
}
