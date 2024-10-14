import { Button } from "@mui/material"
import { User } from "../../../reduxToolkit/slices/user/types"

type CurrentUserProps = {
    styles: any
    currentUser: User
    submitUpdate: () => void
    resetChanges: () => void
    getNewUser: () => void
}

const CurrentUser: React.FC<CurrentUserProps> = ({ styles, currentUser, submitUpdate, resetChanges, getNewUser }) => {
    return (
        <div className={styles["current-user"]}>
            <p>
                Editing user: <strong>{currentUser.login}</strong>
            </p>
            <Button
                variant="outlined"
                color="info"
                sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                onClick={submitUpdate}
            >
                Update user
            </Button>
            <Button variant="outlined" color="info" sx={{ marginTop: "1rem", marginLeft: "1rem" }} onClick={getNewUser}>
                Get new user
            </Button>
            <Button
                variant="outlined"
                color="info"
                sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                onClick={resetChanges}
            >
                Reset Changes
            </Button>
        </div>
    )
}

export default CurrentUser
