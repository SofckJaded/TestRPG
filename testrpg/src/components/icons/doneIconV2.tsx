import React from "react"
import "../../assets/css/main.scss"
import done from "../../assets/img/done2.svg"

export default function DoneIconV2(props: { style?: React.CSSProperties }) {
    return <img src={done} alt="" style={props.style} />
}
