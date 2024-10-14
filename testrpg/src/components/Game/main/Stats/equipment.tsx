import React from "react"
import { useSelector } from "react-redux"
import { Item } from "../../../../reduxToolkit/slices/items/types"
import { RootState } from "../../../../reduxToolkit/store"
import InventoryItem from "../Inventory/inventoryItem"

type EquipmentProps = {
    current?: string
    disabled?: boolean
}

const Equipment: React.FC<EquipmentProps> = ({ current, disabled }) => {
    let userItems = useSelector((state: RootState) => state.userItems.userItems)
    const enemyItems: Item[] = []
    const activeItems = userItems

    return (
        <div className="equipment-active bg-dark-secondary">
            {current === "enemy"
                ? enemyItems
                      .filter((a) => a.active === true)
                      .map((i) => <InventoryItem item={i} key={i._id} setActive={false} disabled={disabled} />)
                : activeItems
                      .filter((a) => a.active === true)
                      .map((i) => <InventoryItem item={i} key={i._id} setActive={false} disabled={disabled} />)}
        </div>
    )
}

export default Equipment
