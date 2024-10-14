import React from "react"
import Logo from "../../Home/logo"
import CurrentAction from "./CurrentAction"
import ProfileMenu from "./ProfileMenu"
import "../../../assets/css/main.scss"

type GameHeaderProps = { path: string }

const GameHeader: React.FC<GameHeaderProps> = ({ path }) => {
    return (
        <div className="header bg-dark animate__animated animate__fadeInDown">
            <div>
                <Logo />
            </div>
            <CurrentAction path={path} />
            <ProfileMenu />
        </div>
    )
}

export default GameHeader
