import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { TowerStage } from "../components/Game/main/Map/towerStage"
import CloseIcon from "../components/icons/closeIcon"
import DoneIconV2 from "../components/icons/doneIconV2"
import CircleIcon from "../components/icons/circleIcon"
import LeftArrowIcon from "../components/icons/leftArrowIcon"
import HelmetIcon from "../components/avatar/helmet"
import { RootState } from "../reduxToolkit/store"

const Map = () => {
    const user = useSelector((state: RootState) => state.user.data)
    const copyTowerStage = [...TowerStage]
    const [towerStage, setTowerStage] = useState(copyTowerStage)

    const setStage = () => {
        setTowerStage(
            towerStage.map((stage) => {
                if (user.locationStage === stage.lvl) {
                    stage.current = true
                }
                return stage
            })
        )
    }

    const setCompletedStage = () => {
        setTowerStage(
            towerStage.map((stage) => {
                if (stage.lvl < user.locationStage) {
                    stage.completed = true
                }
                return stage
            })
        )
    }

    useEffect(() => {
        setStage()
        setCompletedStage()
    }, [])

    return (
        <div className="map bg-dark">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <h3>Shibou Tower</h3>
                <p>Level {user.locationLevel}</p>
            </div>
            <div>
                {towerStage.reverse().map((stage) => (
                    <div key={stage.lvl} style={{ marginBottom: "0.5rem" }}>
                        {stage.current ? (
                            <div style={{ position: "relative" }}>
                                <CircleIcon style={{ width: "3rem" }} />
                                <LeftArrowIcon style={{ width: "3rem", position: "absolute" }} />
                                <HelmetIcon
                                    style={{ width: "5rem", position: "absolute", left: "6rem", bottom: "1px" }}
                                />
                            </div>
                        ) : stage.completed ? (
                            <DoneIconV2 style={{ width: "3rem" }} />
                        ) : (
                            <CloseIcon style={{ width: "3rem" }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Map
