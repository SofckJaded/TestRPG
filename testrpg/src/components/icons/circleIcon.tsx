import React from "react"
import "../../assets/css/main.scss"
import circle from "../../assets/img/circle-41.svg"

export default function CircleIcon(props: { style?: React.CSSProperties }) {
    return <img src={circle} alt="" style={props.style} />
}
