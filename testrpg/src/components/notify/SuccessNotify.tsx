import React from "react"
import Done from "../icons/doneIcon"

export default function SuccessNotify(props: { title: string; text: string }) {
    return (
        <div className="notify">
            <div>
                <Done />
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
