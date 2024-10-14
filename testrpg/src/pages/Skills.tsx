import React from "react"
import SkillAttribute from "../components/Game/main/Skills/skillsAttribute"
import { useSelector, useDispatch } from "react-redux"
import { equipSkillAsync } from "../reduxToolkit/slices/skills/skillsSlice"
import { RootState } from "../reduxToolkit/store"

const Skills = () => {
    const dispatch = useDispatch()
    const { userSkills } = useSelector((state: RootState) => state.userSkills)

    const addEquip = (id: number, active: boolean) => {
        dispatch(equipSkillAsync({ skillId: id, active }))
    }

    return (
        <div className="skills bg-dark">
            {userSkills.map((p) => (
                <div
                    className={
                        p.active
                            ? "card card-active animate__animated animate__zoomInLeft animate__faster"
                            : "card animate__animated animate__zoomInLeft animate__faster"
                    }
                    key={p.id}
                >
                    <div
                        style={{
                            background: "rgba(10, 10, 10, 0.4)",
                            display: "flex",
                            padding: "10px"
                        }}
                    >
                        <img src={p.icon} alt="" />
                        <div style={{ marginLeft: "5px" }}>
                            <p style={{ textAlign: "center", marginBottom: "2px" }}>{p.title}</p>
                            <p className="card-desc">
                                {p.description}{" "}
                                <strong style={{ float: "right", marginLeft: "10px" }}>
                                    {p.ultimate ? "Ultimate" : ""}
                                    {p.passive ? " Passive" : ""}
                                </strong>
                            </p>
                        </div>
                    </div>
                    <SkillAttribute skill={p} />
                    <span className="btn_span" onClick={(event) => addEquip(p.id, !p.active)}>
                        {p.active ? "Unequip" : "Equip"}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Skills
