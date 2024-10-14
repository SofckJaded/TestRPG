import React from "react"
import "../../../assets/css/main.scss"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItem from "@mui/material/ListItem"
import Invicon from "../../icons/invicon"
import Skillsicon from "../../icons/skillsicon"
import Swordicon from "../../icons/swordicon"
import Trainingicon from "../../icons/trainingicon"
import Statsicon from "../../icons/statsicon"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../reduxToolkit/store"

export default function Sidebar() {
    const [selectedIndex, setSelectedIndex] = React.useState<number>()
    const user = useSelector((stats: RootState) => stats.user.data)
    const navigate = useNavigate()

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index)
        if (index === 1) {
            navigate("/stats")
        } else if (index === 2) {
            navigate("/inventory")
        } else if (index === 3) {
            navigate("/skills")
        } else if (index === 4) {
            navigate("/combat")
        } else if (index === 5) {
            navigate("/map")
        } else if (index === 6) {
            navigate("/store")
        }
    }
    return (
        <div className="sidebar bg-dark animate__animated animate__fadeInLeft">
            <h2 style={{ textAlign: "center", paddingTop: "10px" }}>Menu</h2>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton selected={selectedIndex === 1} onClick={(e) => handleListItemClick(1)}>
                    <Statsicon />
                    <p>Stats</p>
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(2)}>
                    <Invicon />
                    <p>Inventory</p>
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(3)}>
                    <Skillsicon />
                    <p>Skills</p>
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(4)}>
                    <Swordicon />
                    <p>Combat</p>
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(5)}>
                    <Trainingicon />
                    <p>Map</p>
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 6} onClick={(event) => handleListItemClick(6)}>
                    <Trainingicon />
                    <p>Store</p>
                </ListItemButton>
            </List>
            <h2 style={{ textAlign: "center", paddingTop: "10px" }}>Main Attributes</h2>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem>
                    <Invicon />
                    <p>HP</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {Math.round(user.currentHp)}/{user.totalHp}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Mana</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {Math.round(user.currentMana)}/{user.totalMana}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Damage</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.whiteDamage} {user.greenDamage ? `+ ${user.greenDamage}` : ""}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Attack speed</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.baseAttackSpeed}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Armor</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.armor + Math.round(user.baseArmor)}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Strength</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.strength}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Agility</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.agility}
                    </strong>
                </ListItem>
                <ListItem>
                    <Invicon />
                    <p>Intelligence</p>
                    <strong style={{ marginLeft: "auto" }} className="ft-larger">
                        {user.intelligence}
                    </strong>
                </ListItem>
            </List>
        </div>
    )
}
