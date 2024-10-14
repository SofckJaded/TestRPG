import React from "react"
import Equipment from "../components/Game/main/Stats/equipment"
import { useSelector, useDispatch } from "react-redux"
import InventoryItem from "../components/Game/main/Inventory/inventoryItem"
import { DangerNotification } from "../components/notify/DangerNotification"
import { SuccessNotification } from "../components/notify/SuccessNotification"
import { equipItemAsync } from "../reduxToolkit/slices/items/itemsSlice"
import {
    setItemAgility,
    setItemInt,
    setItemStrength,
    setItemHpRegen,
    setItemManaRegen,
    setItemArmor,
    setItemBAS,
    setItemSpellAmp,
    setItemBonusDamage,
    removeItemBonusDamage,
    removeItemSpellAmp,
    removeItemBAS,
    removeItemArmor,
    removeItemManaRegen,
    removeItemHpRegen,
    removeItemAgility,
    removeItemInt,
    removeItemStrength
} from "../reduxToolkit/slices/user/userSlice"
import { RootState } from "../reduxToolkit/store"
import { Item } from "../reduxToolkit/slices/items/types"

type Status = "add" | "remove"

const Inventory = () => {
    const userItems = useSelector((state: RootState) => state.userItems.userItems)
    const dispatch = useDispatch()
    let activeItems = []

    const setItemStats = (item: Item, status: Status) => {
        if (item.agility) {
            if (status === "add") {
                dispatch(setItemAgility(item.agility))
            } else {
                dispatch(removeItemAgility(item.agility))
            }
        }
        if (item.intelligence) {
            if (status === "add") {
                dispatch(setItemInt(item.intelligence))
            } else {
                dispatch(removeItemInt(item.intelligence))
            }
        }
        if (item.strength) {
            if (status === "add") {
                dispatch(setItemStrength(item.strength))
            } else {
                dispatch(removeItemStrength(item.strength))
            }
        }
        if (item.bonusDamage) {
            if (status === "add") {
                dispatch(setItemBonusDamage(item.bonusDamage))
            } else {
                dispatch(removeItemBonusDamage(item.bonusDamage))
            }
        }
        if (item.hpRegen) {
            if (status === "add") {
                dispatch(setItemHpRegen(item.hpRegen))
            } else {
                dispatch(removeItemHpRegen(item.hpRegen))
            }
        }
        if (item.manaRegen) {
            if (status === "add") {
                dispatch(setItemManaRegen(item.manaRegen))
            } else {
                dispatch(removeItemManaRegen(item.manaRegen))
            }
        }
        if (item.armor) {
            if (status === "add") {
                dispatch(setItemArmor(item.armor))
            } else {
                dispatch(removeItemArmor(item.armor))
            }
        }
        if (item.spellAmp) {
            if (status === "add") {
                dispatch(setItemSpellAmp(item.spellAmp))
            } else {
                dispatch(removeItemSpellAmp(item.spellAmp))
            }
        }
        if (item.attackSpeed) {
            if (status === "add") {
                dispatch(setItemBAS(item.attackSpeed))
            } else {
                dispatch(removeItemBAS(item.attackSpeed))
            }
        }
    }

    const addEquip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: Item) => {
        activeItems = userItems.filter((item) => item.active === true)
        if (activeItems.length >= 6) {
            if (activeItems.some(({ _id }) => _id === i._id)) {
                dispatch(equipItemAsync({ _id: i._id!, active: !i.active }))
                setItemStats(i, "remove")
                SuccessNotification("Unequipped", i.title + " has been unequipped", 2000)
            } else {
                DangerNotification("Error", "You cannot equip more than 6 items", 2000)
            }
        } else {
            dispatch(equipItemAsync({ _id: i._id!, active: !i.active }))
            if (i.active) {
                setItemStats(i, "remove")
                SuccessNotification("Unequipped", i.title + " has been unequipped", 2000)
            } else {
                setItemStats(i, "add")
                SuccessNotification("Equipped", i.title + " has been equipped", 2000)
            }
        }
    }

    return (
        <div className="inventory bg-dark">
            <div>
                <h3 style={{ textAlign: "center" }}>Inventory</h3>
                <div className="inventory-showcase animate__animated animate__fadeInLeft animate__faster">
                    {userItems.map((i, index) => (
                        <InventoryItem
                            item={i}
                            index={index}
                            addEquip={addEquip}
                            key={i._id}
                            setActive={true}
                            draggable={true}
                        />
                    ))}
                </div>
            </div>
            <div className="animate__animated animate__fadeInRight animate__faster">
                <h3 className="items-active-title bg-dark-secondary" style={{ marginTop: "0" }}>
                    Equipped Items
                </h3>
                <Equipment disabled={true} />
                <h3 className="items-active-title bg-dark-secondary">Item Craft</h3>
            </div>
        </div>
    )
}

export default Inventory
