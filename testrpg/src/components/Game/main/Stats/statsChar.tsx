import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reduxToolkit/store"
import HpBar from "../HPManaBar/hpbar"
import ManaBar from "../HPManaBar/manabar"

const StatsChar = () => {
    const user = useSelector((stats: RootState) => stats.user.data)
    const manaRegen = user.manaRegen + user.baseManaRegen

    const statsAttack = [
        { id: 1, title: "Attack Speed", value: `${user.baseAttackSpeed} (${user.attackSpeed}s)` },
        { id: 2, title: "Damage", value: `${user.whiteDamage} ${user.greenDamage ? `+ ${user.greenDamage}` : ""}` },
        { id: 3, title: "Spell Amp", value: `${user.spellApm}%` },
        { id: 4, title: "Mana Regen", value: manaRegen.toFixed(1) },
        { id: 5, title: "Critical hit", value: `${user.criticalHit}%` }
    ]

    const statsDefence = [
        { id: 1, title: "Armor", value: user.armor + Math.round(user.baseArmor) },
        { id: 2, title: "Physical Resist", value: `${user.physicalResistance}%` },
        { id: 3, title: "Status Resist", value: `${user.statusResistance}%` },
        { id: 4, title: "Evasion", value: `${user.evasion}%` },
        { id: 5, title: "Health Regen", value: user.hpRegen + user.baseHpRegen }
    ]

    return (
        <div className="stats-char bg-dark-secondary animate__animated animate__fadeInRight animate__faster">
            <HpBar />
            <ManaBar />
            <div className="stats-char-title">
                <p style={{ marginBottom: "10px" }}>Attack</p>
                <p>Defence</p>
            </div>
            <table>
                <tbody>
                    <tr style={{ display: "grid" }}>
                        {statsAttack.map((statsAttack) => (
                            <td key={statsAttack.id} style={{ marginRight: "20px", marginBottom: "10px" }}>
                                {statsAttack.title}
                            </td>
                        ))}
                    </tr>
                    <tr style={{ display: "grid" }}>
                        {statsAttack.map((statsAttack) => (
                            <td key={statsAttack.id}>{statsAttack.value}</td>
                        ))}
                    </tr>
                    <tr style={{ display: "grid" }}>
                        {statsDefence.map((statsDefence) => (
                            <td key={statsDefence.id} style={{ marginRight: "20px" }}>
                                {statsDefence.title}
                            </td>
                        ))}
                    </tr>
                    <tr style={{ display: "grid" }}>
                        {statsDefence.map((statsDefence) => (
                            <td key={statsDefence.id}>{statsDefence.value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <div className="">
                <ul>
                    <li style={{ background: "rgba(220,53,69,0.4)", borderRadius: "1%" }}>
                        Strength <strong>{user.strength}</strong> (Gains 2.5 per lvl) = {user.totalHp}
                        HP and {statsDefence[4].value} {statsDefence[4].title}
                        {user.mainAttribute === "strength" ? " - Primary" : ""}
                    </li>
                    <li
                        style={{
                            background: "rgba(25,135,84, 0.4)",
                            borderRadius: "1%"
                        }}
                    >
                        Agility <strong>{user.agility}</strong> (Gains 2.5 per lvl) = {statsDefence[0].value} Armor and{" "}
                        {statsAttack[0].value} {statsAttack[0].title}
                        {user.mainAttribute === "agility" ? " - Primary" : ""}
                    </li>
                    <li
                        style={{
                            background: "rgba(13,202,240,0.4)",
                            borderRadius: "1%"
                        }}
                    >
                        Intelligence <strong>{user.intelligence}</strong> (Gains 2.5 per lvl) = {user.totalMana} mana
                        and {statsAttack[3].value} {statsAttack[3].title}
                        {user.mainAttribute === "intelligence" ? " - Primary" : ""}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default StatsChar
