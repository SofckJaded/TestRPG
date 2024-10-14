import React from "react"
import "../../assets/css/main.scss"
import strength from "../../assets/img/strength.svg"

export default function StrengthIcon(props: { style?: React.CSSProperties }) {
    return <img src={strength} alt="" style={props.style} />
}
