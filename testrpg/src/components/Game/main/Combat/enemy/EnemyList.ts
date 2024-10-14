import creepSkeleton from "../../../../../assets/img/enemy/creep-skeleton.svg"

export const EnemyList = [
    {
        id: 1,
        name: "Skeleton",
        type: "creep",
        description:
            "Skeletons are remaining of those who tried and failed. They wander the levels of tower not knowing who they are or what they are doing.",
        img: creepSkeleton,
        stage: 1,
        totalHp: 550,
        currentHp: 550,
        hpRegen: 0.5,
        attackSpeed: 1,
        damage: 20,
        armor: 2
    }
]
