import React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../../reduxToolkit/slices/user/userSlice"
import { useNavigate } from "react-router-dom"
import { intHp } from "../Game"
import { skillsLogout } from "../../../reduxToolkit/slices/skills/skillsSlice"
import { itemsLogout } from "../../../reduxToolkit/slices/items/itemsSlice"
import { RootState } from "../../../reduxToolkit/store"

export default function ProfileMenu() {
    const user = useSelector((state: RootState) => state.user.data)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const dispatch = useDispatch()
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const logOut = () => {
        clearInterval(intHp)
        dispatch(logout())
        dispatch(skillsLogout())
        dispatch(itemsLogout())
        window.localStorage.removeItem("token")
        return navigate("/login")
    }

    return (
        <div style={{ alignSelf: "center", marginRight: "4%" }}>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <p style={{ color: "#ffffff", fontSize: "larger", marginTop: "4px" }}>{user.login}</p>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button"
                }}
            >
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={() => navigate("/admin")}>Admin Page</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
