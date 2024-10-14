import SuccessNotify from "./SuccessNotify"
import { Store } from "react-notifications-component"

export const SuccessNotification = (title: string, message: string, duration = 3000) => {
    Store.addNotification({
        content: <SuccessNotify title={title} text={message} />,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeInLeft"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
            duration: duration
        }
    })
}
