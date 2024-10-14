import React from "react"
import CloseIcon from "../icons/closeIcon"

export default function DangerNotify(props: { title: string; text: string }) {
    return (
        <div className="notify" style={{ background: "#dc3545" }}>
            <div className="notify-logo">
                <CloseIcon
                    style={{
                        width: "1.3rem",
                        position: "relative",
                        top: "4px"
                    }}
                />
            </div>
            <div className="notify-content">
                <div className="notify-content-title">
                    <strong>{props.title}</strong>
                </div>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
