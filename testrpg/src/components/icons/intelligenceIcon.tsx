import React from "react"
import "../../assets/css/main.scss"
import intelligence from "../../assets/img/intelligence.svg"

export default function IntelligenceIcon(props: { style?: React.CSSProperties }) {
    return <img src={intelligence} alt="" style={props.style} />
}
