import React from "react"
import logoImg from "../../assets/img/logo.png"

export default function Logo() {
    return (
        <div className="logo">
            <img
                src={logoImg}
                alt=""
                className="animate__animated animate__fadeInLeft"
            />
            <div className="animate__animated animate__fadeInLeft">
                <h1>Shibou</h1>
                <h2>RPG</h2>
            </div>
        </div>
    )
}
