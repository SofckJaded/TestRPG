import React from "react"
import { Skill } from "../../../../reduxToolkit/slices/skills/types"

type SkillAttributeProps = {
    skill: Skill
    style?: React.CSSProperties
}

const SkillAttribute: React.FC<SkillAttributeProps> = ({ skill, style }) => {
    return (
        <div>
            {skill.attrs1 ? (
                <div className="card-attrs" style={style}>
                    <p style={{ color: "#1976d2" }}>
                        <strong>Skill Level 1</strong>
                    </p>
                    <p style={{ color: "#1976d2" }}>
                        <strong className={skill.rarity}>Rarity: {skill.rarity}</strong>
                    </p>
                    {skill.attrs1[0].duration ? (
                        <p>
                            Duration: <strong>{skill.attrs1[0].duration}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].bonusDamage ? (
                        <p>
                            Bonus Damage: <strong>{skill.attrs1[0].bonusDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].damage ? (
                        <p>
                            Damage: <strong>{skill.attrs1[0].damage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].healthBurn ? (
                        <p>
                            Health Burn: <strong>{skill.attrs1[0].healthBurn}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].lifeSteal ? (
                        <p>
                            LifeSteal: <strong>{skill.attrs1[0].lifeSteal}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].chance ? (
                        <p>
                            Chance: <strong>{skill.attrs1[0].chance}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].criticalDamage ? (
                        <p>
                            Critical Damage: <strong>{skill.attrs1[0].criticalDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].bonusAttackSpeed ? (
                        <p>
                            Bonus Attack Speed: <strong>{skill.attrs1[0].bonusAttackSpeed}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].evasion ? (
                        <p>
                            Evasion: <strong>{skill.attrs1[0].evasion}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].cast ? (
                        <p>
                            Cast time: <strong>{skill.attrs1[0].cast}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].coolDown ? (
                        <p>
                            CoolDown: <strong>{skill.attrs1[0].coolDown}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs1[0].manaCost ? (
                        <p>
                            ManaCost: <strong>{skill.attrs1[0].manaCost}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            ) : skill.attrs2 ? (
                <div className="card-attrs" style={style}>
                    <p style={{ color: "#1976d2" }}>
                        <strong>Skill Level 2</strong>
                    </p>
                    <p style={{ color: "#1976d2" }}>
                        <strong className={skill.rarity}>Rarity: {skill.rarity}</strong>
                    </p>
                    {skill.attrs2[0].duration ? (
                        <p>
                            Duration: <strong>{skill.attrs2[0].duration}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].bonusDamage ? (
                        <p>
                            Bonus Damage: <strong>{skill.attrs2[0].bonusDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].damage ? (
                        <p>
                            Damage: <strong>{skill.attrs2[0].damage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].healthBurn ? (
                        <p>
                            Health Burn: <strong>{skill.attrs2[0].healthBurn}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].lifeSteal ? (
                        <p>
                            LifeSteal: <strong>{skill.attrs2[0].lifeSteal}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].chance ? (
                        <p>
                            Chance: <strong>{skill.attrs2[0].chance}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].criticalDamage ? (
                        <p>
                            Critical Damage: <strong>{skill.attrs2[0].criticalDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].bonusAttackSpeed ? (
                        <p>
                            Bonus Attack Speed: <strong>{skill.attrs2[0].bonusAttackSpeed}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].evasion ? (
                        <p>
                            Evasion: <strong>{skill.attrs2[0].evasion}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].cast ? (
                        <p>
                            Cast time: <strong>{skill.attrs2[0].cast}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].coolDown ? (
                        <p>
                            CoolDown: <strong>{skill.attrs2[0].coolDown}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs2[0].manaCost ? (
                        <p>
                            ManaCost: <strong>{skill.attrs2[0].manaCost}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            ) : skill.attrs3 ? (
                <div className="card-attrs" style={style}>
                    <p style={{ color: "#1976d2" }}>
                        <strong>Skill Level 3</strong>
                    </p>
                    <p style={{ color: "#1976d2" }}>
                        <strong className={skill.rarity}>Rarity: {skill.rarity}</strong>
                    </p>
                    {skill.attrs3[0].duration ? (
                        <p>
                            Duration: <strong>{skill.attrs3[0].duration}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].bonusDamage ? (
                        <p>
                            Bonus Damage: <strong>{skill.attrs3[0].bonusDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].damage ? (
                        <p>
                            Damage: <strong>{skill.attrs3[0].damage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].healthBurn ? (
                        <p>
                            Health Burn: <strong>{skill.attrs3[0].healthBurn}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].lifeSteal ? (
                        <p>
                            LifeSteal: <strong>{skill.attrs3[0].lifeSteal}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].chance ? (
                        <p>
                            Chance: <strong>{skill.attrs3[0].chance}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].criticalDamage ? (
                        <p>
                            Critical Damage: <strong>{skill.attrs3[0].criticalDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].bonusAttackSpeed ? (
                        <p>
                            Bonus Attack Speed: <strong>{skill.attrs3[0].bonusAttackSpeed}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].evasion ? (
                        <p>
                            Evasion: <strong>{skill.attrs3[0].evasion}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].cast ? (
                        <p>
                            Cast time: <strong>{skill.attrs3[0].cast}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].coolDown ? (
                        <p>
                            CoolDown: <strong>{skill.attrs3[0].coolDown}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs3[0].manaCost ? (
                        <p>
                            ManaCost: <strong>{skill.attrs3[0].manaCost}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            ) : skill.attrs4 ? (
                <div className="card-attrs" style={style}>
                    <p style={{ color: "#1976d2" }}>
                        <strong>Skill Level 4</strong>
                    </p>
                    <p style={{ color: "#1976d2" }}>
                        <strong className={skill.rarity}>Rarity: {skill.rarity}</strong>
                    </p>
                    {skill.attrs4[0].duration ? (
                        <p>
                            Duration: <strong>{skill.attrs4[0].duration}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].bonusDamage ? (
                        <p>
                            Bonus Damage: <strong>{skill.attrs4[0].bonusDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].damage ? (
                        <p>
                            Damage: <strong>{skill.attrs4[0].damage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].healthBurn ? (
                        <p>
                            Health Burn: <strong>{skill.attrs4[0].healthBurn}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].lifeSteal ? (
                        <p>
                            LifeSteal: <strong>{skill.attrs4[0].lifeSteal}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].chance ? (
                        <p>
                            Chance: <strong>{skill.attrs4[0].chance}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].criticalDamage ? (
                        <p>
                            Crit Damage: <strong>{skill.attrs4[0].criticalDamage}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].bonusAttackSpeed ? (
                        <p>
                            Bonus Attack Speed: <strong>{skill.attrs4[0].bonusAttackSpeed}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].evasion ? (
                        <p>
                            Evasion: <strong>{skill.attrs4[0].evasion}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].cast ? (
                        <p>
                            Cast time: <strong>{skill.attrs4[0].cast}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].coolDown ? (
                        <p>
                            CoolDown: <strong>{skill.attrs4[0].coolDown}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                    {skill.attrs4[0].manaCost ? (
                        <p>
                            ManaCost: <strong>{skill.attrs4[0].manaCost}</strong>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default SkillAttribute
