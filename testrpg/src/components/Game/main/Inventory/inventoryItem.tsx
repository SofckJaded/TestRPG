import React, { useRef, useState } from "react"
import CoinIcon from "../../../icons/coinIcon"
import done from "../../../../assets/img/done.svg"
import close_green from "../../../../assets/img/closeGreen.svg"
import Popover from "@mui/material/Popover"
import { Item } from "../../../../reduxToolkit/slices/items/types"

type InventoryItemProps = {
    item: Item
    setActive: boolean
    disablePointer?: boolean
    draggable?: boolean
    index?: number
    disabled?: boolean
    craftStatus?: boolean
    uniqueId?: boolean
    addEquip?: (e: React.MouseEvent<HTMLDivElement>, item: Item) => void
}

const InventoryItem: React.FC<InventoryItemProps> = ({
    item,
    setActive,
    disablePointer,
    draggable,
    index,
    disabled,
    craftStatus,
    addEquip
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const itemEl = useRef<HTMLDivElement>(null)

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)

    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, item: Item, index: number) => {
        // itemEl.current!.style.display = "none"
        // event.dataTransfer.setData("item_id", item._id)
        // event.dataTransfer.setData("itemIndex", index.toString())
    }

    const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {}

    return (
        <div
            className={
                setActive ? (item.active ? "inventory-item card-active" : "inventory-item item-brd") : "inventory-item"
            }
            ref={itemEl}
            style={disablePointer ? { cursor: "auto" } : undefined}
            onClick={addEquip ? (event) => addEquip(event, item) : undefined}
            draggable={draggable}
            onDragStart={(event) => dragStartHandler(event, item, index!)}
            onDragEnd={(event) => dragEndHandler(event)}
            id={index?.toString()}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            <img src={item.icon} alt={item.title} draggable={false} />
            {craftStatus ? (
                <div
                    className="inv-badge"
                    style={{
                        bottom: "0",
                        left: "3rem",
                        backgroundColor: "transparent"
                    }}
                >
                    <CoinIcon />
                    <p style={{ paddingTop: "0.5rem" }}>{item.recipe}</p>
                </div>
            ) : (
                ""
            )}
            {craftStatus ? (
                item.recipe ? (
                    ""
                ) : item.craftAdded === "added" ? (
                    <div className="inv-badge">
                        <img src={done} alt="" />
                    </div>
                ) : (
                    <div className="inv-badge">
                        <img src={close_green} alt="" />
                    </div>
                )
            ) : (
                ""
            )}
            {item.stack ? (
                item.amount ? (
                    <div className="inv-badge">
                        <strong>{item.amount}</strong>
                    </div>
                ) : (
                    ""
                )
            ) : (
                ""
            )}
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "unset"
                    }
                }}
            >
                <div className="popOver">
                    <div className="popOver-head">
                        <p style={{ textAlign: "center" }}>
                            {item.title}
                            {item.amount ? <strong> ({item.amount})</strong> : ""}
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "medium",
                                color: "#adb5bd "
                            }}
                        >
                            {item.type}
                        </p>
                        <p style={{ textAlign: "center" }}>
                            <CoinIcon /> {item.price}({item.price / 2})
                        </p>
                        <hr style={{ margin: "0.5rem 0 0.5rem 0" }} />
                        <p style={{ fontSize: "large", textAlign: "justify" }}>{item.description}</p>
                    </div>
                    <div className="popOver-body" style={{ fontSize: "large" }}>
                        <hr style={{ margin: "0.3rem 0 0.3rem 0" }} />
                        {item.rarity ? <p className={item.rarity}>Rarity: {item.rarity}</p> : ""}
                        {item.passive ? <p>Passive</p> : ""}
                        {item.healthRestored ? (
                            <p>
                                Health Restored: <strong>{item.healthRestored}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.manaRestored ? (
                            <p>
                                Mana Restored: <strong>{item.manaRestored}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.hpRegen ? (
                            <p>
                                Health Regeneration: <strong>{item.hpRegen}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.manaRegen ? (
                            <p>
                                Mana Regeneration: <strong>{item.manaRegen}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.spellAmp ? (
                            <p>
                                Spell Amplification: <strong>{item.spellAmp}%</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.bonusDamage ? (
                            <p>
                                Bonus Damage: <strong>{item.bonusDamage}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.attackSpeed ? (
                            <p>
                                Attack Speed: <strong>{item.attackSpeed}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.armor ? (
                            <p>
                                Armor: <strong>{item.armor}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.agility ? (
                            <p>
                                Agility: <strong>{item.agility}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.intelligence ? (
                            <p>
                                Intelligence: <strong>{item.intelligence}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.strength ? (
                            <p>
                                Strength: <strong>{item.strength}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.duration ? (
                            <p>
                                Duration: <strong>{item.duration}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.manaCost ? (
                            <p>
                                ManaCost: <strong>{item.manaCost}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                        {item.coolDown ? (
                            <p>
                                CoolDown: <strong>{item.coolDown}</strong>
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default InventoryItem
