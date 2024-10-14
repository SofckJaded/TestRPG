import React, { useEffect, useState } from "react"
import InventoryItem from "../inventoryItem"
import { allItems } from "../allItems"
import { useDispatch, useSelector } from "react-redux"
import { uniqueId } from "../../../../../assets/js/uniqueId"
import { DangerNotification } from "../../../../notify/DangerNotification"
import { SuccessNotification } from "../../../../notify/SuccessNotification"
import { RootState } from "../../../../../reduxToolkit/store"
import { Item } from "../../../../../reduxToolkit/slices/items/types"

type CraftProps = {
    setItemStats: (item: Item, status: string) => void
}

const Craft: React.FC<CraftProps> = (props) => {
    return <div></div>
    const allGameItems = [...allItems]
    const userItems = useSelector((state: RootState) => state.userItems.userItems)
    const dispatch = useDispatch()
    const [itemFromCraft, setItemFromCraft] = useState<Item[]>([])
    const [itemToCraft, setItemToCraft] = useState<Item[]>([])
    const [itemSkeletonCraft, setItemSkeletonCraft] = useState<Item[]>([])
    let itemSkeleton: Item[] = []
    let itemCraft = []
    let recipe: any = []

    const dropCraft = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const itemUniqueId = event.dataTransfer.getData("itemUniqueId")
        const itemIndex = event.dataTransfer.getData("itemIndex")

        const item = userItems.find((item) => item._id === itemUniqueId)
        if (!item) {
            return DangerNotification("Error", "Something went wrong", 2000)
        }
        craftItemHandler(item, itemIndex)
    }

    const craftItemHandler = (item: Item, index: string) => {
        itemCraft = []

        const craftable = allGameItems.filter((i) => i.craft) //
        if (itemToCraft.length === 0) {
            try {
                itemCraft = craftable.filter((i) => item.craftTo?.includes(i.id))
                setItemToCraft(itemCraft)
                if (itemCraft.length === 1) {
                    setItemFromCraft([...itemFromCraft, item])
                    document
                        .getElementById(index)
                        ?.classList.add("animate__animated", "animate__fadeOutBottomRight", "animate__fast")
                    setTimeout(() => {
                        document.getElementById(index)!.style.display = "none"
                    }, 800)
                    craftSelectItem(itemCraft)
                } else {
                    setItemFromCraft([...itemFromCraft, item])
                    document
                        .getElementById(index)
                        ?.classList.add("animate__animated", "animate__fadeOutBottomRight", "animate__fast")
                    setTimeout(() => {
                        document.getElementById(index)!.style.display = "none"
                    }, 800)
                }
            } catch (e) {
                console.log(e)
                if (e instanceof TypeError) {
                    DangerNotification("Error", "Nothing to craft from this item", 2000)
                }
            }
        } else {
            if (itemToCraft.length > 1) {
                DangerNotification("Error", "Choose item to craft before further actions", 2000)
            } else {
                if (itemToCraft[0].requires?.includes(item.id)) {
                    if (itemFromCraft.some((r) => r.id === item.id)) {
                        DangerNotification("Error", "Item has already been added", 2000)
                    } else {
                        setItemFromCraft([...itemFromCraft, item])
                        document
                            .getElementById(index)
                            ?.classList.add("animate__animated", "animate__fadeOutBottomRight", "animate__fast")
                        document.getElementById(index)?.addEventListener("animationend", () => {
                            document.getElementById(index)!.style.display = "none"
                        })
                    }
                } else {
                    DangerNotification("Error", "This item is not required", 2000)
                }
            }
        }
    }

    const craftSelectItem = (items: Item[], event?: React.MouseEvent<HTMLDivElement>, item?: Item) => {
        if (items.length === 1) {
            craftStart(items)
        } else {
            if (item) {
                setItemToCraft([item])
                craftStart([item])
            }
            setItemFromCraft([...itemFromCraft])
        }
    }

    const craftStart = (items: Item[]) => {
        recipe = []
        itemSkeleton = []
        if (items.length > 0) {
            items[0].requires?.forEach((id) => {
                itemSkeleton.push(allGameItems.find((item) => item.id === id)!)
                itemFromCraft.forEach((i) => {
                    itemSkeleton.forEach((c) => {
                        if (c.id === i.id) {
                            c.craftAdded = "none"
                        }
                    })
                })
            })
            if (items[0].recipe) {
                recipe = { recipe: items[0].recipe }
                itemSkeleton = [...itemSkeleton, recipe]
                setItemSkeletonCraft(itemSkeleton)
            }
        }
    }

    useEffect(() => {
        let itemSkeletonArr: Item[] = []
        if (itemFromCraft.length !== 0) {
            itemSkeletonArr = itemSkeletonCraft
            itemFromCraft.forEach((c) => {
                itemSkeletonArr.forEach((i) => {
                    if (c.id === i.id) {
                        i.craftAdded = "added"
                    }
                })
            })
            setItemSkeletonCraft([...itemSkeletonArr])
        }
    }, [itemFromCraft])

    const craftReset = (event?: React.MouseEvent<HTMLSpanElement>) => {
        let itemSkeletonArr2: Item[] = []
        if (itemFromCraft.length !== 0) {
            itemSkeletonArr2 = itemSkeletonCraft
            itemFromCraft.forEach((c) => {
                itemSkeletonArr2.forEach((i) => {
                    if (c.id === i.id) {
                        i.craftAdded = "nope"
                    }
                })
            })
            setItemSkeletonCraft([...itemSkeletonArr2])
        }
        const empty: any = []
        setItemFromCraft([...empty])
        setItemToCraft([...empty])
        setItemSkeletonCraft([...empty])
        itemSkeleton = []
        itemCraft = []
        recipe = []
        userItems.forEach((item, index) => {
            document
                .getElementById(index.toString())
                ?.classList.remove("animate__animated", "animate__fadeOutBottomRight", "animate__fast")
            document.getElementById(index.toString())!.style.display = "block"
        })
    }

    const craftFinish = (event: React.MouseEvent<HTMLSpanElement>) => {
        if ((event.target as HTMLSpanElement).innerText === "Craft") {
            if (itemToCraft[0].requires?.length === 2) {
                try {
                    if (itemToCraft[0].requires.includes(itemFromCraft[0].id & itemFromCraft[1].id)) {
                        let itemDispatch = { id: itemToCraft[0].id, active: false }
                        // dispatch({ type: "ADD_ITEM", payload: itemDispatch })
                        // dispatch({ type: "REMOVE_ITEM", payload: itemFromCraft })
                        itemFromCraft.forEach((item) => {
                            if (item.active === true) {
                                // RemoveItemStats(item)
                                props.setItemStats(item, "remove")
                            }
                        })
                        SuccessNotification("Success", itemToCraft[0].title + " has been successfully crafted", 2500)
                        setTimeout(() => {
                            itemDispatch = null!
                            itemToCraft[0] = null!
                        })
                        craftReset()
                    }
                } catch (e) {
                    if (e instanceof TypeError) {
                        DangerNotification("Error", "Missing required items", 2000)
                    }
                }
            }
            if (itemToCraft[0].requires.length === 3) {
                try {
                    if (
                        itemToCraft[0].requires.includes(
                            itemFromCraft[0].id & itemFromCraft[1].id & itemFromCraft[2].id
                        )
                    ) {
                        let uniqId = uniqueId()
                        let itemDispatch2 = { id: itemToCraft[0].id, active: false, uniqueId: uniqId }
                        dispatch({ type: "ADD_ITEM", payload: itemDispatch2 })
                        dispatch({ type: "REMOVE_ITEM", payload: itemFromCraft })
                        SuccessNotification("Success", itemToCraft[0].title + " has been successfully crafted", 2500)
                        craftReset()
                    }
                } catch (e) {
                    if (e instanceof TypeError) {
                        DangerNotification("Error", "Missing required items", 2000)
                    }
                }
            }
            if (itemToCraft[0].requires.length === 4) {
                try {
                    if (
                        itemToCraft[0].requires.includes(
                            itemFromCraft[0].id & itemFromCraft[1].id & itemFromCraft[2].id & itemFromCraft[3].id
                        )
                    ) {
                        let uniqId = uniqueId()
                        let itemDispatch3 = { id: itemToCraft[0].id, active: false, uniqueId: uniqId }
                        dispatch({ type: "ADD_ITEM", payload: itemDispatch3 })
                        dispatch({ type: "REMOVE_ITEM", payload: itemFromCraft })
                        SuccessNotification("Success", itemToCraft[0].title + " has been successfully crafted", 2500)
                        craftReset()
                    }
                } catch (e) {
                    if (e instanceof TypeError) {
                        DangerNotification("Error", "Missing required items", 2000)
                    }
                }
            }
        }
    }

    function dragOver(event) {
        event.preventDefault()
    }

    return (
        <div className="bg-dark-secondary" onDrop={(event) => dropCraft(event)} onDragOver={(event) => dragOver(event)}>
            <div className="craft-item-body">
                {itemToCraft.length === 0 ? (
                    <div className="craft-item-start animate__animated animate__fadeIn">
                        <p>Drag items here to start crafting</p>
                    </div>
                ) : (
                    <div className="craft-item-process" id="craftItem">
                        <h4
                            style={{
                                margin: "0.5rem 0",
                                textAlign: "center"
                            }}
                        >
                            Available crafts:
                        </h4>
                        <div className="craft-item-main">
                            {itemToCraft.map((i, index) => (
                                <div
                                    key={i.id}
                                    onClick={(event) => craftSelectItem([], event, i)}
                                    className="animate__animated animate__fadeIn"
                                >
                                    <InventoryItem
                                        item={i}
                                        index={index}
                                        key={index}
                                        setActive={false}
                                        draggable={false}
                                        disabled={true}
                                    />
                                </div>
                            ))}
                        </div>
                        <h4
                            style={{
                                margin: "0.5rem 0",
                                textAlign: "center"
                            }}
                        >
                            {itemSkeletonCraft.length === 0 ? "Craft from: " : "Requires:"}
                        </h4>
                        <div className="craft-item-main animate__animated animate__fadeIn">
                            {itemSkeletonCraft.length === 0
                                ? itemFromCraft.map((i, index) => (
                                      <div className="animate__animated animate__fadeIn" key={index}>
                                          <InventoryItem
                                              item={i}
                                              index={index}
                                              key={i.uniqueId}
                                              setActive={false}
                                              draggable={false}
                                              disablePointer={true}
                                          />
                                      </div>
                                  ))
                                : itemSkeletonCraft.map((i, index) => (
                                      <div className="animate__animated animate__fadeIn" key={index}>
                                          <InventoryItem
                                              item={i}
                                              index={index}
                                              key={index}
                                              setActive={false}
                                              draggable={false}
                                              disabled={true}
                                              disablePointer={true}
                                              craftStatus={true}
                                          />
                                      </div>
                                  ))}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                marginTop: "1rem"
                            }}
                        >
                            <span
                                className="btn_span"
                                style={{
                                    padding: "0.5rem"
                                }}
                                onClick={(event) => craftFinish(event)}
                            >
                                Craft
                            </span>
                            <span
                                className="btn_span"
                                style={{
                                    padding: "0.5rem",
                                    marginLeft: "0.2rem"
                                }}
                                onClick={(event) => craftReset(event)}
                            >
                                Reset
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Craft
