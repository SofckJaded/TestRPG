import React from "react"
import "../../assets/css/main.scss"
import coinIcon from "../../assets/img/coinIcon.svg"

export default function CoinIcon(props: { style?: React.CSSProperties }) {
    return <img src={coinIcon} alt="" style={{ width: "1.5rem", position: "relative", top: "4px" }} />
}
