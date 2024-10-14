import React, { useState } from "react"
import styles from "../../assets/css/login.module.scss"
import DangerNotify from "../../components/notify/DangerNotify"
import { Store } from "react-notifications-component"
import { checkUser } from "../../http/userApi"
import { useNavigate, Navigate } from "react-router-dom"
import AgilityIcon from "../../components/icons/agilityIcon"
import StrengthIcon from "../../components/icons/strengthIcon"
import IntelligenceIcon from "../../components/icons/intelligenceIcon"
import { CircularProgress } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchAuth, fetchRegister, selectIsAuth } from "../../reduxToolkit/slices/user/userSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../reduxToolkit/store"

export default function Index() {
    const [firstStepAuth, setFirstStepAuth] = useState(false)
    const [secondStepAuth, setSecondStepAuth] = useState(false)
    const [email, setEmail] = useState("test@gmail.com")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("123123")
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const status = useSelector((state: RootState) => state.user.status)

    if (isAuth) {
        return <Navigate to="/stats" />
    }

    const notification = (error: string) => {
        Store.addNotification({
            content: <DangerNotify title={"Error"} text={error} />,
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeInLeft"],
            animationOut: ["animate__animated", "animate__fadeOutRight"],
            dismiss: {
                duration: 3000
            }
        })
    }

    const firstStep = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if (!password || !email) {
            return notification("The field cannot be empty")
        }

        if (!emailPattern.test(email)) {
            return notification("Enter proper email address")
        }

        if (password.length <= 5) {
            return notification("The password must contain at least 6 characters")
        }

        setLoading(true)

        try {
            const data = await checkUser(email)
            if (data) {
                dispatch(fetchAuth({ email, password }))
                return navigate("/stats", { replace: true })
            }
        } catch (e: any) {
            if (e.response.statusText !== "Not Found") {
                setLoading(false)
                return notification("Server error, try later")
            } else {
                setLoading(false)
                setFirstStepAuth(true)
            }
        }
    }

    const secondStep = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!login) {
            return notification("The field cannot be empty")
        }

        if (login.length <= 2) {
            return notification("The login must contain at least 3 characters")
        }

        setSecondStepAuth(true)
    }

    const submitFinal = async (attr: string) => {
        try {
            dispatch(fetchRegister({ email, login, attr, password }))
            return navigate("/stats", { replace: true })
        } catch (e: any) {
            return notification(e.response.data.message)
        }
    }

    return (
        <div className={styles.login}>
            {status === "loading" ? (
                <CircularProgress />
            ) : !secondStepAuth ? (
                <div className={styles["login-box"]}>
                    <h2>{!firstStepAuth ? "Authorization" : "Creating new account"}</h2>
                    {!firstStepAuth ? (
                        <form onSubmit={firstStep}>
                            <div className={styles["user-box"]}>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name=""
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className={styles["user-box"]}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name=""
                                    required
                                />
                                <label>Password</label>
                            </div>
                            {loading ? (
                                <CircularProgress
                                    size="1.6rem"
                                    sx={{
                                        color: "white"
                                    }}
                                />
                            ) : (
                                <button type="submit">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Submit
                                </button>
                            )}
                        </form>
                    ) : (
                        <form onSubmit={secondStep}>
                            <div className={styles["user-box"]}>
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    name=""
                                    required
                                />
                                <label>Login</label>
                            </div>
                            <button type="submit">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <div className={styles["attr-box"]}>
                    <h2>Choose your primary attribute</h2>
                    <h3>Attributes are the main statistics that independently determine most scaling statistics</h3>
                    <h3>Primary attribute grows faster than the other two attributes</h3>
                    <h3>A primary attribute heavily impacts and commonly defines the play style</h3>
                    <h3>Attributes are gained with level ups</h3>
                    <h4>Note: you cannot change it later!</h4>
                    <div className={styles.attributes}>
                        <div className={styles["attr-item"]} onClick={(e) => submitFinal("agility")}>
                            <h2>
                                <AgilityIcon
                                    style={{ width: "1.5rem", marginRight: "0.3rem", position: "relative", top: "3px" }}
                                />
                                Agility
                            </h2>
                            <p>Agility determines a hero's armor and attack speed.</p>
                            <p>
                                Heroes with agility as their primary attribute tend to be more dependent on their
                                physical attacks and items, and are usually capable of falling back on their abilities
                                in a pinch.
                            </p>
                            <p>Every point in Agility attribute increases:</p>
                            <ul>
                                <li>Armor by 0.167 (1/6)</li>
                                <li>Attack speed by 1</li>
                                <li>
                                    For agility heroes, every point in agility also increases main attack damage by 1.
                                </li>
                            </ul>
                        </div>
                        <div className={styles["attr-item"]} onClick={(e) => submitFinal("strength")}>
                            <h2>
                                <StrengthIcon
                                    style={{ width: "1.5rem", marginRight: "0.3rem", position: "relative", top: "3px" }}
                                />
                                Strength
                            </h2>
                            <p>
                                Strength is a measure of a hero's toughness and endurance. Strength determines a hero's
                                maximum health and health regeneration. Heroes with strength as their primary attribute
                                can be hard to kill.
                            </p>
                            <p>Every point in Strength attribute increases: </p>
                            <ul>
                                <li>Maximum health by 20.</li>
                                <li>Health regeneration by 0.1</li>
                                <li>
                                    For strength heroes, every point in strength also increases main attack damage by 1.
                                </li>
                            </ul>
                        </div>
                        <div className={styles["attr-item"]} onClick={(e) => submitFinal("intelligence")}>
                            <h2>
                                <IntelligenceIcon
                                    style={{ width: "1.5rem", marginRight: "0.3rem", position: "relative", top: "3px" }}
                                />
                                Intelligence
                            </h2>
                            <p>
                                Intelligence is a measure of a hero's wit and wisdom. Intelligence determines a hero's
                                maximum mana and mana regeneration. Heroes with intelligence as their primary attribute
                                tend to rely on their abilities to deal damage.
                            </p>
                            <p>Every point in Intelligence attribute increases:</p>
                            <ul>
                                <li>Maximum mana by 12</li>
                                <li>Mana regeneration by 0.05</li>
                                <li>
                                    For intelligence heroes, every point in intelligence also increases main attack
                                    damage by 1.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
