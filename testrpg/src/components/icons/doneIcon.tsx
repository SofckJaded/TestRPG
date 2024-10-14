import React from "react"
import "../../assets/css/main.scss"
import done from "../../assets/img/done.svg"

export default function Done(props: { style?: React.CSSProperties }) {
    return (
        <img
            src={done}
            alt=""
            style={{
                width: "2.5rem",
                position: "relative",
                top: "4px"
            }}
        />
    )
}
