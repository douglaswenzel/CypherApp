import { api } from "./api"

interface RegisterData {
    username: string
    password: string
}

export async function registerService(data: RegisterData) {
    const response = await api.post("/auth/register", data)

    return response.data
}
