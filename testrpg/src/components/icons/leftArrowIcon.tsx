import React from "react"
import "../../assets/css/main.scss"
import leftArrow from "../../assets/img/arrow-direction-left-way-backword-previous-54.svg"

export default function LeftArrowIcon(props: { style?: React.CSSProperties }) {
    return <img src={leftArrow} alt="" style={props.style} />
}
