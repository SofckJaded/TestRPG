import { itemItem } from "../reduxToolkit/slices/user/types"
import { $authHost } from "./index"

export const fetchEquipItem = async (_id: string, active: boolean) => {
    const { data } = await $authHost.post<{ _id: string; active: boolean }>("api/item/equipitem", { _id, active })
    return data
}

export const fetchAddItemAsync = async (item: itemItem) => {
    const { data } = await $authHost.post<itemItem>("api/item/addItem", item)
    return data
}

export const fetchRemoveItemAsync = async (item: itemItem) => {
    const { data } = await $authHost.post<itemItem>("api/item/removeItem", item)
    return data
}

export const adminAddItem = async (userId: string, rawItems: { itemId: number; active: boolean }[]) => {
    await $authHost.post("/api/item/adminAddItem", { userId, rawItems })
}

export const adminRemoveItem = async (userId: string, rawItems: { _id: string }[]) => {
    await $authHost.post("/api/item/adminRemoveItem", { userId, rawItems })
}
