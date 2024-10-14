import DangerNotify from "./DangerNotify"
import { Store } from "react-notifications-component"

export const DangerNotification = (title: string, message: string, duration = 3000) => {
    Store.addNotification({
        content: <DangerNotify title={title} text={message} />,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeInLeft"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
            duration: duration
        }
    })
}
