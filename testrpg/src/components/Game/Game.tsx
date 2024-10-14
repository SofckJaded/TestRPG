import React from "react"
import GameHeader from "./gameHeader/gameHeader"
import Sidebar from "./sideBar/Sidebar"
import LvlStatus from "./main/Lvlbar/Lvlstatus"
import Stats from "../../pages/Stats"
import Skills from "../../pages/Skills"
import Combat from "../../pages/Combat"
import Shop from "../../pages/Shop"
import Inventory from "../../pages/Inventory"
import { useLocation } from "react-router-dom"
import InitItemStats from "../../assets/js/InitItemStats"
import InitStats from "../../assets/js/InitStats"
import Map from "../../pages/Map"
import { InitEnemy } from "../../assets/js/InitEnemy"
import { InitUser } from "../../assets/js/InitUser"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentHpAsync, setCurrentManaAsync } from "../../reduxToolkit/slices/user/userSlice"
import { useEffect } from "react"
import { useRef } from "react"
import { RootState } from "../../reduxToolkit/store"
import Admin from "../../pages/Admin"

export let intHp: any

const Game = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.data)
    const currentHp = useRef(user.currentHp)
    const currentMana = useRef(user.currentMana)
    InitUser()
    InitItemStats()
    InitStats()
    InitEnemy()

    const fetchStats = () => {
        if (document.visibilityState === "hidden") {
            const raw = { currentHp: currentHp.current, currentMana: currentMana.current, id: user._id }
            const data = JSON.stringify(raw)
            navigator.sendBeacon("http://localhost:5000/api/auth/sethpmana", data)
        }
    }

    useEffect(() => {
        // window.addEventListener("visibilitychange", fetchStats)
    }, [])

    useEffect(() => {
        clearInterval(intHp)
        const setHp = () => {
            clearInterval(intHp)
            if (user.currentHp === user.totalHp) {
                return false
            }

            if (user.currentHp > user.totalHp) {
                return dispatch(setCurrentHpAsync("set"))
            }

            if (Math.round(user.currentHp) < user.totalHp) {
                dispatch(setCurrentHpAsync("add"))
                clearInterval(intHp)
            }
        }

        const setMana = () => {
            clearInterval(intHp)
            if (user.currentMana === user.totalMana) {
                return false
            }

            if (user.currentMana > user.totalMana) {
                dispatch(setCurrentManaAsync("set"))
            }

            if (Math.round(user.currentMana) < user.totalMana) {
                dispatch(setCurrentManaAsync("add"))
                clearInterval(intHp)
            }
        }
        intHp = setInterval(() => {
            setHp()
            setMana()
        }, 1000)
    }, [dispatch, user.currentMana, user.currentHp, user.totalHp, user.totalMana])

    const location = useLocation()
    let currentLocation

    if (location.pathname === "/stats") {
        currentLocation = <Stats />
    } else if (location.pathname === "/inventory") {
        currentLocation = <Inventory />
    } else if (location.pathname === "/skills") {
        currentLocation = <Skills />
    } else if (location.pathname === "/combat") {
        currentLocation = <Combat />
    } else if (location.pathname === "/map") {
        currentLocation = <Map />
    } else if (location.pathname === "/store") {
        currentLocation = <Shop />
    } else if (location.pathname === "/admin") {
        currentLocation = <Admin />
    }

    return (
        <div className="wrapper">
            <GameHeader path={location.pathname} />
            <div className="content">
                <Sidebar />
                <div className="container animate__animated animate__fadeInRight">
                    <LvlStatus />
                    {currentLocation}
                </div>
            </div>
        </div>
    )
}

export default Game
