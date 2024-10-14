import { User } from "../reduxToolkit/slices/user/types"
import { $authHost, $host } from "./index"

export const registration = async (email: string, login: string, mainAttribute: string, password: string) => {
    const { data } = await $host.post<User>("api/auth/registration", { email, login, mainAttribute, password })
    localStorage.setItem("token", data.token)
    return data
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post<User>("api/auth/login", { email, password })
    localStorage.setItem("token", data.token)
    return data
}

export const auth = async () => {
    const { data } = await $authHost.get<User>("api/auth/getme")
    return data
}

// export const check = async () => {
//     const { data } = await $authHost.get("api/auth/check")
//     localStorage.setItem("token", data.token)
//     return jwt_decode(data.token)
// }

export const checkUser = async (email: string) => {
    const { data } = await $host.post<{ message: string }>("api/auth/checkuser", { email })
    return data.message
}

export const setStat = async (stat: string, value: number) => {
    const { data } = await $authHost.post<{ stat: string; value: number }>("api/auth/setstat", { stat, value })
    return data
}

export const getUser = async (login: string) => {
    const { data } = await $authHost.post<User>("api/auth/getUser", { login })
    return data
}

export const updateUser = async (user: User) => {
    const { data } = await $authHost.post<User>("api/auth/updateUser", { user })
    return data
}
