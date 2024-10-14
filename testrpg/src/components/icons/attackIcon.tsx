import React from "react"
import "../../assets/css/main.scss"
import attackIcon from "../../assets/img/attackIcon.svg"

export default function AgilityIcon(props: { style?: React.CSSProperties }) {
    return <img src={attackIcon} alt="" style={props.style} />
}
