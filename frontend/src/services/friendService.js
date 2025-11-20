import api from "../libs/apis/api";

export async function SendRequest(targetId) {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found.");
        if (!targetId) throw new Error("No targetId provided.");

        const response = await api.post(
            `/user/send-request/${encodeURIComponent(targetId)}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Make sure it returns an array
        return response.data.data.users || [];
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to get all users");
        }
        throw new Error(error.message || "Network error.");
    }
}