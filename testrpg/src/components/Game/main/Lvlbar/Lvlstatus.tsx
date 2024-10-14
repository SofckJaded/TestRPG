import React from "react"
import LvlBar from "./lvlbar"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reduxToolkit/store"

const LvlStatus = () => {
    const user = useSelector((state: RootState) => state.user.data)
    return (
        <div className="lvl-status bg-dark animate__animated animate__fadeInDown">
            <div className="lvl-exp">
                <p>
                    Level <strong>{user.lvl}/30</strong>
                </p>
                <p>
                    Exp <strong>{user.exp}/100</strong>
                </p>
            </div>
            <LvlBar />
        </div>
    )
}

export default LvlStatus
