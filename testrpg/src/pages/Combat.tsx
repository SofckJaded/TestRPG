import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HpBar from "../components/Game/main/HPManaBar/hpbar"
import ManaBar from "../components/Game/main/HPManaBar/manabar"
import SkillsActive from "../components/Game/main/Skills/skillsActive"
import Equipment from "../components/Game/main/Stats/equipment"
import HelmetIcon from "../components/avatar/helmet"
import { RootState } from "../reduxToolkit/store"
import { combatHandDamage, setFightStatus, setLogMessages } from "../reduxToolkit/slices/combat/combatSlice"
import styles from "../assets/css/components/game/combat/combat.module.scss"
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import attackIcon from "../assets/img/attackIcon.svg"

const Combat = () => {
    const user = useSelector((state: RootState) => state.user.data)
    const { enemy, fightStatus, logMessages } = useSelector((state: RootState) => state.combat)
    const dispatch = useDispatch()
    const [equipWindow, setEquipWindow] = useState("user")
    const timerId = useRef<NodeJS.Timeout | null>(null)
    const timerId2 = useRef<NodeJS.Timeout | null>(null)

    const fightStart = () => {
        dispatch(setFightStatus(true))
        fightLoop()
    }

    const fightLoop = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        timerId.current = setTimeout(function tick() {
            if (user.currentHp <= 0 && enemy.currentHp <= 0) return
            dispatch(
                setLogMessages({
                    icon: attackIcon,
                    text: `${user.login} dealt ${user.whiteDamage + user.greenDamage} damage`
                })
            )
            dispatch(combatHandDamage(user.whiteDamage + user.greenDamage))
            timerId.current = setTimeout(tick, user.attackSpeed * 1000) // (*)
        }, user.attackSpeed * 1000)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        timerId2.current = setTimeout(function tick1() {
            if (user.currentHp <= 0 && enemy.currentHp <= 0) return
            dispatch(
                setLogMessages({
                    icon: attackIcon,
                    text: `${enemy.name} dealt ${enemy.damage} damage`
                })
            )
            timerId2.current = setTimeout(tick1, enemy.attackSpeed * 1000) // (*)
        }, enemy.attackSpeed * 1000)
    }

    const fightStop = () => {}

    const initEquipWindow = (state: string) => {
        state === "user" ? setEquipWindow("user") : setEquipWindow("enemy")
    }

    useEffect(() => {
        if (user.currentHp <= 0) {
            dispatch(setFightStatus(false))
            clearTimeout(timerId.current as NodeJS.Timeout)
            clearTimeout(timerId2.current as NodeJS.Timeout)
            return console.log("fight lost")
        }
        if (enemy.currentHp <= 0) {
            dispatch(setFightStatus(false))
            clearTimeout(timerId.current as NodeJS.Timeout)
            clearTimeout(timerId2.current as NodeJS.Timeout)
            return console.log("fight won")
        }
    }, [user.currentHp, enemy.currentHp, dispatch])

    return (
        <div className={`${styles["combat"]} bg-dark`}>
            <div className={styles["combat-body"]}>
                <div
                    className={`${styles["combat-body-avatar"]} bg-dark-secondary `}
                    onClick={(event) => initEquipWindow("user")}
                >
                    <HelmetIcon className={styles["combat-avatar-img"]} />{" "}
                    <div style={{ textAlign: "center" }}>
                        <p>{user.login}</p>
                        <p>Lvl {user.lvl}</p>
                    </div>
                </div>
                {fightStatus ? (
                    <div
                        className={`${styles["combat-fight-log"]} bg-dark-secondary animate__animated animate__backInDown`}
                    >
                        <List
                            sx={{ maxHeight: 410, overflow: "auto", display: "flex", flexDirection: "column-reverse" }}
                        >
                            {logMessages
                                .slice(0)
                                .reverse()
                                .map((message, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar src={message.icon} alt="A"></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={message.text} />
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                ) : (
                    <div>
                        <Button variant="contained" onClick={(event) => fightStart()}>
                            Attack
                        </Button>
                    </div>
                )}
                <div
                    className={`${styles["combat-body-avatar"]} bg-dark-secondary`}
                    onClick={(event) => initEquipWindow("enemy")}
                >
                    <img src={enemy.img} alt="" className={styles["combat-avatar-img"]} />
                    <div style={{ textAlign: "center" }}>
                        <p>{enemy.name}</p>
                        <p>Lvl {user.locationLevel}</p>
                        <div style={{ textAlign: "justify", marginTop: "1rem" }}>
                            {fightStatus ? (
                                <div>
                                    {" "}
                                    <HpBar current={"enemy"} />
                                    <ManaBar current={"enemy"} />
                                </div>
                            ) : (
                                enemy.description
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["combat-bottom"]}>
                <div className={`${styles["combat-bottom-stats"]} bg-dark-secondary`}>
                    <div>
                        <p>Damage </p>
                        <p>Armor</p>
                        <p>{equipWindow === "user" ? "Strength" : ""}</p>
                        <p>{equipWindow === "user" ? "Agility" : ""}</p>
                        <p>{equipWindow === "user" ? "Intelligence" : ""}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        {equipWindow === "user" ? (
                            <strong>
                                {user.whiteDamage} {user.greenDamage ? `+ ${user.greenDamage}` : ""}
                            </strong>
                        ) : (
                            <strong>{enemy.damage}</strong>
                        )}
                        <strong>
                            {equipWindow === "user" ? user.armor + Math.round(user.baseArmor) : enemy.armor}
                        </strong>
                        <strong>{equipWindow === "user" ? user.strength : ""}</strong>
                        <strong>{equipWindow === "user" ? user.agility : ""}</strong>
                        <strong>{equipWindow === "user" ? user.intelligence : ""}</strong>
                    </div>
                </div>
                <div style={{ width: "32rem" }}>
                    <div>
                        <HpBar current={equipWindow === "user" ? "user" : "enemy"} />{" "}
                        {equipWindow === "user" ? (
                            <ManaBar current={"user"} />
                        ) : enemy.totalMana ? (
                            <ManaBar current={"enemy"} />
                        ) : (
                            ""
                        )}
                    </div>
                    <SkillsActive current={equipWindow} />
                </div>
                <div>
                    <Equipment current={equipWindow} />
                </div>
            </div>
        </div>
    )
}

export default Combat
