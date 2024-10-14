import React from "react"
import "../../assets/css/main.scss"
import agility from "../../assets/img/agility.svg"

export default function AgilityIcon(props: { style?: React.CSSProperties }) {
    return <img src={agility} alt="" style={props.style} />
}
