import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reduxToolkit/store"
import SkillPopOver from "./skillPopOver"

type SkillsActiveProps = {
    current?: string
}

const SkillsActive: React.FC<SkillsActiveProps> = ({ current }) => {
    const userSkills = useSelector((state: RootState) => state.userSkills.userSkills)
    const enemySkills: any = []

    return (
        <div className="skills-active bg-dark-secondary">
            {current === "enemy"
                ? enemySkills.filter((skill: any) => skill.active === true).map((p: any) => <SkillPopOver skill={p} />)
                : userSkills.filter((skill) => skill.active === true).map((p) => <SkillPopOver skill={p} key={p.id} />)}
        </div>
    )
}

export default SkillsActive
