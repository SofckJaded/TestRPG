import { Box, Tab, Tabs } from "@mui/material"
import { itemItem, skillItem, User } from "../reduxToolkit/slices/user/types"
import React, { useState } from "react"
import styles from "../assets/css/components/admin/admin.module.scss"
import GetUserForm from "../components/Game/admin/getUserForm"
import { TabPanel } from "../components/Game/admin/tabPanel"
import { DataGrid, GridColumns, GridRowModel } from "@mui/x-data-grid"
import { getUser, updateUser } from "../http/userApi"
import { allItems } from "../components/Game/main/Inventory/allItems"
import { Item } from "../reduxToolkit/slices/items/types"
import CurrentUser from "../components/Game/admin/currentUserDisplay"
import AddRemoveItem from "../components/Game/admin/addRemoveItem"
import CurrentItemsList from "../components/Game/admin/currentItemsList"
import { adminAddItem, adminRemoveItem } from "../http/itemApi"
import AddSkill from "../components/Game/admin/addSkill"
import RemoveSkill from "../components/Game/admin/removeSkill"
import { skills } from "../components/Game/main/Skills/allSkills"
import { Skill } from "../reduxToolkit/slices/skills/types"
import { adminUpdateSkills } from "../http/skillApi"
import { SuccessNotification } from "../components/notify/SuccessNotification"
import { DangerNotification } from "../components/notify/DangerNotification"

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    }
}

const columns: GridColumns = [
    { field: "stat", headerName: "Stats", width: 150, editable: false },
    { field: "value", headerName: "Value", type: "string | number", width: 280, editable: true }
]

const Admin = () => {
    const [value, setValue] = useState(0)
    const [currentUser, setCurrentUser] = useState<User>()
    const [editedUser, setEditedUser] = useState<User>()
    const [loginField, setLoginField] = useState("")
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [currentRow, setCurrentRow] = useState([])
    const [currentItems, setCurrentItems] = useState<Item[]>([])
    const [editedItems, setEditedItems] = useState<Item[]>([])
    const [itemsToAdd, setItemsToAdd] = useState<Item[]>([])
    const [itemsToRemove, setItemsToRemove] = useState<Item[]>([])
    const [currentSkills, setCurrentSkills] = useState<Skill[]>([])
    const [editedSkills, setEditedSkills] = useState<Skill[]>([])
    const [addableSkills, setAddableSkills] = useState<Skill[]>([])
    const allGameItems = [...allItems]
    const allGameSkills = JSON.parse(JSON.stringify(skills))
    const addibleSkills = JSON.parse(JSON.stringify(skills))

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await getUser(loginField)
            const { skills, items, ...userData } = data
            setCurrentUser(userData)
            setEditedUser(userData)
            setRows(userData)

            if (items) {
                getItems(items)
            }

            if (skills) {
                getSkills(skills)
            }
        } catch (error: any) {
            setErrorStatus(true)
            if (error.response.data.message === "User is not found") {
                setErrorMessage("User is not found")
            } else {
                setErrorMessage("Something went wrong")
            }
        }
    }

    const setRows = (userData: User) => {
        const data: User[] = []
        data.push(userData)
        const reducedData = data.reduce((acc: any, obj: any) => {
            Object.keys(obj).forEach((key, index) => {
                acc.push({ value: obj[key], stat: key, id: index })
            })
            return acc
        }, [])
        setCurrentRow(reducedData)
    }

    const getSkills = (skills: skillItem[]) => {
        let userAllSkills: Skill[] = []
        if (skills.length) {
            userAllSkills = allGameSkills.filter((skill: { id: number }) => skills.some((s) => s.skillId === skill.id))
        }

        const userFinalSkills = userAllSkills.map((skill, index) => {
            return {
                ...skill,
                lvl: (skill.lvl = skills[index].lvl),
                active: (skill.active = skills[index].active)
            }
        })
        setCurrentSkills(userFinalSkills)
        setEditedSkills(userFinalSkills)
        setAddableSkills(addibleSkills.filter((ar: { id: number }) => !skills.find((s) => ar.id === s.skillId)))
    }

    const getItems = (items: itemItem[]) => {
        const userAllItems: Item[] = []
        if (items.length) {
            items?.forEach((u) => {
                let item = allGameItems.find((i) => i.id === u.itemId)
                userAllItems.push({ ...item! })
            })
        }

        const userFinalItems = userAllItems.map((item, index) => {
            return {
                ...item,
                _id: (item._id = items![index]._id),
                active: (item.active = items![index].active!)
                // amount: (item.amount = user.items[index].amount)
            }
        })

        setCurrentItems(userFinalItems)
        setEditedItems(userFinalItems)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const getNewUser = () => {
        setCurrentUser(undefined)
        setCurrentRow([])
        setLoginField("")
        setEditedItems([])
        setItemsToAdd([])
        setItemsToRemove([])
        setCurrentSkills([])
    }

    const resetChanges = () => {
        setEditedUser(currentUser)
        setRows(currentUser!)
        setItemsToAdd([])
        setItemsToRemove([])
        setEditedItems([...currentItems])
        setEditedSkills([...currentSkills])
    }

    const submitUpdate = async () => {
        let updated = false

        if (editedUser && JSON.stringify(editedUser) !== JSON.stringify(currentUser)) {
            await updateUser(editedUser)
            updated = true
        }

        if (itemsToAdd?.length) {
            const rawData = itemsToAdd.map((i) => {
                return {
                    itemId: i.id,
                    active: false
                }
            })
            await adminAddItem(currentUser?._id!, rawData)
            updated = true
        }

        if (itemsToRemove?.length) {
            const rawData = itemsToRemove.map((i) => {
                return {
                    _id: i._id!
                }
            })
            await adminRemoveItem(currentUser?._id!, rawData)
            updated = true
        }

        if (editedSkills && JSON.stringify(editedSkills) !== JSON.stringify(currentSkills)) {
            const rawData = editedSkills.map((skill) => {
                return {
                    skillId: skill.id,
                    active: skill.active,
                    lvl: skill.lvl ? skill.lvl : 1
                }
            })
            await adminUpdateSkills(currentUser?._id!, rawData)
            updated = true
        }

        if (updated) {
            return SuccessNotification("Success", "User has been updated", 2000)
        } else {
            return DangerNotification("Error", "No changes has been made", 2000)
        }
    }

    const rowUpdateHandler = (newRow: GridRowModel) => {
        const { stat, value } = newRow
        currentUser &&
            setEditedUser((prevState) => {
                return { ...prevState!, [stat]: value }
            })
        return newRow
    }

    return (
        <div className={styles.content}>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="User settings" {...a11yProps(0)} sx={{ color: "white" }} />
                        <Tab label="Game settings" {...a11yProps(1)} sx={{ color: "white" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className={styles["get-user"]}>
                        {currentUser ? (
                            <CurrentUser
                                styles={styles}
                                currentUser={currentUser}
                                submitUpdate={submitUpdate}
                                resetChanges={resetChanges}
                                getNewUser={getNewUser}
                            />
                        ) : (
                            <GetUserForm
                                handleForm={handleForm}
                                loginField={loginField}
                                setLoginField={setLoginField}
                                errorStatus={errorStatus}
                                errorMessage={errorMessage}
                            />
                        )}
                    </div>
                    <hr />
                    {currentUser ? (
                        <div className={styles["main-content"]}>
                            <div>
                                <h4 className={styles["main-content-title"]}>Set Stats</h4>
                                <div style={{ height: 500, width: "100%", padding: "0.3rem" }}>
                                    <DataGrid
                                        rows={currentRow}
                                        columns={columns}
                                        processRowUpdate={rowUpdateHandler}
                                        hideFooter={true}
                                        sx={{ color: "white" }}
                                        disableColumnFilter={true}
                                        disableColumnMenu={true}
                                        disableColumnSelector={true}
                                        disableDensitySelector={true}
                                        experimentalFeatures={{ newEditingApi: true }}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className={styles["main-content-title"]}>Add/Remove Item</h4>
                                <div className={styles["add-remove-item"]}>
                                    <AddRemoveItem setItemsToAdd={setItemsToAdd} setEditedItems={setEditedItems} />
                                    <CurrentItemsList
                                        editedItems={editedItems}
                                        setItemsToRemove={setItemsToRemove}
                                        setEditedItems={setEditedItems}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className={styles["main-content-title"]}>Add/Remove Skill</h4>
                                <div>
                                    <AddSkill
                                        addableSkills={addableSkills}
                                        editedSkills={editedSkills}
                                        setEditedSkills={setEditedSkills}
                                        setAddableSkills={setAddableSkills}
                                    />
                                    <RemoveSkill editedSkills={editedSkills} setEditedSkills={setEditedSkills} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", marginTop: "1rem" }}>No user data</div>
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className={styles["main-content"]}>
                        <div>
                            <h4 className={styles["main-content-title"]}>Add Item</h4>
                            <div></div>
                        </div>
                        <div>
                            <h4 className={styles["main-content-title"]}>Add Skill</h4>
                        </div>
                        <div>
                            <h4 className={styles["main-content-title"]}>Add Enemy</h4>
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </div>
    )
}

export default Admin
