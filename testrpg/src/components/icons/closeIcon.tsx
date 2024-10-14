import React from "react"
import "../../assets/css/main.scss"
import close from "../../assets/img/close.svg"

export default function CloseIcon(props: { style?: React.CSSProperties }) {
    return <img src={close} alt="" style={props.style} />
}
