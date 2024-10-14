import flamingArrowIc from "../../../../assets/img/skills_icon/flaming_arrows.svg"
import iceBurnIc from "../../../../assets/img/skills_icon/ice_burn.svg"
import lifeSteal from "../../../../assets/img/skills_icon/lifesteal.png"
import criticalCut from "../../../../assets/img/skills_icon/critical_cut.png"
import multiSlash from "../../../../assets/img/skills_icon/multislash.png"
import wallop from "../../../../assets/img/skills_icon/wallop.png"
import blur from "../../../../assets/img/skills_icon/blur.png"
import magicProjectile from "../../../../assets/img/skills_icon/magic_projectile.png"
import flameStrike from "../../../../assets/img/skills_icon/firestrike.png"
import blueFlame from "../../../../assets/img/skills_icon/blueflame.png"
import reincarnation from "../../../../assets/img/skills_icon/reincarnation.png"
import compelSilence from "../../../../assets/img/skills_icon/compelsilence.png"

export const skills = [
    {
        id: 1,
        title: "Fire Arrows",
        description: "Fire arrows that add physical damage to each attack.",
        rarity: "Rare",
        icon: flamingArrowIc,
        damageType: "Physical",
        active: false,
        attrs1: [{ bonusDamage: 24, manaCost: 10, coolDown: 0 }],
        attrs2: [{ bonusDamage: 36, manaCost: 10, coolDown: 0 }],
        attrs3: [{ bonusDamage: 48, manaCost: 10, coolDown: 0 }],
        attrs4: [{ bonusDamage: 60, manaCost: 10, coolDown: 0 }]
    },
    {
        id: 2,
        title: "Ice burn",
        description:
            "Gives ability to add blistering chill into each attack and burn their health of 6%/7%/8%/9% each second.",
        rarity: "Uncommon",
        icon: iceBurnIc,
        damageType: "Magical",
        active: false,
        attrs1: [
            {
                duration: 8,
                healthBurn: 6,
                manaCost: 100,
                coolDown: 38
            }
        ],
        attrs2: [
            {
                duration: 8,
                healthBurn: 7,
                manaCost: 100,
                coolDown: 32
            }
        ],
        attrs3: [
            {
                duration: 8,
                healthBurn: 8,
                manaCost: 100,
                coolDown: 26
            }
        ],
        attrs4: [
            {
                duration: 8,
                healthBurn: 9,
                manaCost: 100,
                coolDown: 20
            }
        ]
    },
    {
        id: 3,
        title: "LifeSteal",
        description: "Provides heal for a percentage of opponent max health with each attack.",
        rarity: "Uncommon",
        icon: lifeSteal,
        damageType: "Physical",
        passive: true,
        active: false,
        attrs1: [{ duration: 1.5, lifeSteal: 1.6, bonusDamage: 0.6 }],
        attrs2: [{ duration: 1.5, lifeSteal: 2.2, bonusDamage: 0.8 }],
        attrs3: [{ duration: 1.5, lifeSteal: 2.8, bonusDamage: 1 }],
        attrs4: [{ duration: 1.5, lifeSteal: 3.4, bonusDamage: 1.2 }]
    },
    {
        id: 4,
        title: "Critical cut",
        description: "Gives a change to deal critical damage on each attack",
        rarity: "Rare",
        icon: criticalCut,
        damageType: "Physical",
        passive: true,
        active: false,
        attrs1: [{ chance: 20, criticalDamage: 180 }],
        attrs2: [{ chance: 25, criticalDamage: 180 }],
        attrs3: [{ chance: 30, criticalDamage: 180 }],
        attrs4: [{ chance: 35, criticalDamage: 180 }]
    },
    {
        id: 5,
        title: "Multiple Slash",
        description: "Slashes the target with additional attack damage and speed.",
        rarity: "Legendary",
        icon: multiSlash,
        damageType: "Physical",
        active: false,
        ultimate: true,
        attrs1: [
            {
                duration: 3,
                bonusDamage: 30,
                bonusAttackSpeed: 40,
                manaCost: 200,
                coolDown: 140
            }
        ],
        attrs2: [
            {
                duration: 3.25,
                bonusDamage: 40,
                bonusAttackSpeed: 40,
                manaCost: 276,
                coolDown: 140
            }
        ],
        attrs3: [
            {
                duration: 3.5,
                bonusDamage: 50,
                bonusAttackSpeed: 40,
                manaCost: 350,
                coolDown: 140
            }
        ]
    },
    {
        id: 6,
        title: "Wallop",
        description: "Adds the change for an attack to bash an enemy with additional damage",
        rarity: "Uncommon",
        icon: wallop,
        damageType: "Physical",
        active: false,
        passive: true,
        attrs1: [{ chance: 12, bonusDamage: 15, duration: 1 }],
        attrs2: [{ chance: 16, bonusDamage: 20, duration: 1 }],
        attrs3: [{ chance: 20, bonusDamage: 25, duration: 1 }],
        attrs4: [{ chance: 24, bonusDamage: 30, duration: 1 }]
    },
    {
        id: 7,
        title: "Blur",
        description: "Blur the body to increase ability to evade enemy attacks",
        rarity: "Mythical",
        icon: blur,
        active: false,
        passive: true,
        attrs1: [{ evasion: 20 }],
        attrs2: [{ evasion: 30 }],
        attrs3: [{ evasion: 40 }],
        attrs4: [{ evasion: 50 }]
    },
    {
        id: 8,
        title: "Magic Projectile",
        description: "Fires a magic missile at an enemy, stunning and dealing damage.",
        rarity: "Rare",
        icon: magicProjectile,
        active: false,
        damageType: "Magical",
        attrs1: [{ duration: 1.4, damage: 90, cast: 0.5, manaCost: 100, coolDown: 12 }],
        attrs2: [{ duration: 1.5, damage: 180, cast: 0.5, manaCost: 110, coolDown: 11 }],
        attrs3: [{ duration: 1.8, damage: 270, cast: 0.5, manaCost: 120, coolDown: 10 }],
        attrs4: [{ duration: 1.8, damage: 360, cast: 0.5, manaCost: 130, coolDown: 9 }]
    },
    {
        id: 9,
        title: "Flame strike",
        description: "A column of flames that damage and stun enemy",
        rarity: "Uncommon",
        icon: flameStrike,
        active: false,
        damageType: "Magical",
        attrs1: [{ duration: 1.6, damage: 80, cast: 0.5, manaCost: 100, coolDown: 13 }],
        attrs2: [{ duration: 1.9, damage: 130, cast: 0.5, manaCost: 105, coolDown: 11 }],
        attrs3: [{ duration: 2.2, damage: 180, cast: 0.5, manaCost: 110, coolDown: 9 }],
        attrs4: [{ duration: 2.5, damage: 230, cast: 0.5, manaCost: 115, coolDown: 7 }]
    },
    {
        id: 10,
        title: "BlueFlame",
        description: "A strong bolt of blue flame that deals massive damage",
        rarity: "Legendary",
        icon: blueFlame,
        active: false,
        damageType: "Magical",
        ultimate: true,
        attrs1: [{ damage: 500, cast: 0.5, manaCost: 250, coolDown: 70 }],
        attrs2: [{ damage: 700, cast: 0.5, manaCost: 400, coolDown: 60 }],
        attrs3: [{ damage: 900, cast: 0.5, manaCost: 500, coolDown: 50 }]
    },
    {
        id: 11,
        title: "Reincarnation",
        description: "Gives a second life in a battle",
        rarity: "Immortal",
        icon: reincarnation,
        passive: true,
        active: false,
        ultimate: true,
        attrs1: [{ cast: 3, manaCost: 180, coolDown: 200 }],
        attrs2: [{ cast: 3, manaCost: 180, coolDown: 130 }],
        attrs3: [{ cast: 3, manaCost: 180, coolDown: 60 }]
    },
    {
        id: 12,
        title: "Compel silence",
        description: "Enchants an enemy, causing them to be damaged and silenced.",
        rarity: "Uncommon",
        icon: compelSilence,
        active: false,
        damageType: "Magical",
        attrs1: [
            {
                duration: 3,
                damage: 120,
                cast: 1.5,
                manaCost: 100,
                coolDown: 22
            }
        ],
        attrs2: [
            {
                duration: 4,
                damage: 160,
                cast: 1.5,
                manaCost: 105,
                coolDown: 18
            }
        ],
        attrs3: [
            {
                duration: 5,
                damage: 200,
                cast: 1.5,
                manaCost: 110,
                coolDown: 14
            }
        ],
        attrs4: [
            {
                duration: 6,
                damage: 240,
                cast: 1.5,
                manaCost: 115,
                coolDown: 10
            }
        ]
    }
]
