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
        backgroundColor: "#0b380b"
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundColor: "#008000"
    }
}))

type HpBarProps = { current?: "user" | "enemy" }

const HpBar: React.FC<HpBarProps> = ({ current }) => {
    const { currentHp, hpRegen, totalHp, baseHpRegen } = useSelector((state: RootState) => state.user.data)
    const enemy = useSelector((state: RootState) => state.combat.enemy)
    let hp = 0

    const getUserHp = () => {
        if (current === "enemy") {
            hp = (enemy.currentHp / enemy.totalHp) * 100
            return hp
        } else {
            hp = (currentHp / totalHp) * 100
            return hp
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <p style={{ textAlign: "center", color: "white", marginBottom: "10px" }}>
                {current === "enemy" ? `${enemy.currentHp}/${enemy.totalHp}` : `${Math.round(currentHp)}/${totalHp}`} HP
            </p>
            <BorderLinearProgress variant="determinate" value={getUserHp()} sx={{ marginBottom: "1rem" }} />
            <p className={styles.hpRegen}>{current === "enemy" ? enemy.hpRegen : hpRegen + baseHpRegen}</p>
        </Box>
    )
}

export default HpBar
