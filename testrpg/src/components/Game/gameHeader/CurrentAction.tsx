import React from "react"
import InvIcon from "../../icons/invicon"
import StatsIcon from "../../icons/statsicon"
import SkillsIcon from "../../icons/skillsicon"
import CombatIcon from "../../icons/swordicon"
import TrainingIcon from "../../icons/trainingicon"

const action = [
    { id: 1, path: "/stats", title: "Stats", icon: <StatsIcon /> },
    { id: 2, path: "/inventory", title: "Inventory", icon: <InvIcon /> },
    { id: 3, path: "/skills", title: "Skills", icon: <SkillsIcon /> },
    { id: 4, path: "/combat", title: "Combat", icon: <CombatIcon /> },
    { id: 5, path: "/store", title: "Store", icon: <TrainingIcon /> }
]

type CurrentActionProps = { path: string }

const CurrentAction: React.FC<CurrentActionProps> = ({ path }) => {
    return (
        <div className="currentAction">
            {action
                .filter((act) => act.path === path)
                .map((act) => (
                    <div className="currentAction" key={act.id}>
                        {act.icon}
                        <p>{act.title}</p>
                    </div>
                ))}
        </div>
    )
}

export default CurrentAction
