import React from "react"
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { useSelector } from "react-redux"
import styles from "../../../../assets/css/components/game/HPManaBar/hpBar.module.scss"
import { RootState } from "../../../../reduxToolkit/store"

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 16,
    borderRadius: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#275787"
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundColor: "#00bfff"
    }
}))

type ManaBarProps = { current?: "user" | "enemy" }

const ManaBar: React.FC<ManaBarProps> = ({ current }) => {
    const user = useSelector((state: RootState) => state.user.data)
    const enemy = useSelector((state: RootState) => state.combat.enemy)
    const manaRegen = user.manaRegen + user.baseManaRegen
    let mana = 0

    const getUserMana = () => {
        if (current === "enemy") {
            if (enemy.currentMana && enemy.totalMana) {
                mana = (enemy.currentMana / enemy.totalMana) * 100
                return mana
            } else {
                return 0
            }
        } else {
            mana = (user.currentMana / user.totalMana) * 100
            return mana
        }
    }

    return (
        <Box sx={{ flexGrow: 1, minWidth: 350 }}>
            <p style={{ textAlign: "center", color: "white", marginBottom: "10px" }}>
                {current === "enemy"
                    ? enemy.manaRegen
                        ? `${enemy.currentMana}/${enemy.totalMana}`
                        : ""
                    : `${Math.round(user.currentMana)}/${user.totalMana}`}{" "}
                Mana
            </p>
            <BorderLinearProgress variant="determinate" value={getUserMana()} sx={{ marginBottom: "1rem" }} />
            <p className={styles.hpRegen}>
                {current === "enemy" ? (enemy.manaRegen ? enemy.manaRegen : "") : +manaRegen.toFixed(1)}
            </p>
        </Box>
    )
}

export default ManaBar
