import React from "react"
import helmet from "../../assets/img/avatar/knight-helmet.svg"

export default function HelmetIcon(props: { className?: string; style?: React.CSSProperties }) {
    return <img src={helmet} alt="" className={props.className} style={props.style} />
}
