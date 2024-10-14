import React from "react"
import SkillsActive from "../components/Game/main/Skills/skillsActive"
import Equipment from "../components/Game/main/Stats/equipment"
import StatsChar from "../components/Game/main/Stats/statsChar"

const Stats = () => {
    return (
        <div className="stats bg-dark">
            <div className="animate__animated animate__fadeInLeft animate__faster">
                <p className="skill-active-title bg-dark-secondary">Active skills</p>
                <SkillsActive />
                <div style={{ maxWidth: "21rem" }}>
                    <p className="items-active-title bg-dark-secondary">Equipped items</p>
                    <Equipment />
                </div>
            </div>
            <StatsChar />
        </div>
    )
}

export default Stats
