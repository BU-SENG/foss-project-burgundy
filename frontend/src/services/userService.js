import api from "../libs/apis/api";

export async function GetUser() {
    try {
        const response = await api.get('/user/profile')
    }
}