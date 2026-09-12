import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})


export const sendMessage = async (message, chatId) => {
    try {
        const response = await api.post("api/chats/message", { message, chat: chatId });
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
}

export const getChats = async () => {
    try {
        const response = await api.get("api/chats");
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
}

export const getMessages = async (chatId) => {
    try {
        const response = await api.get(`api/chats/${chatId}/messages`);
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
}


export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`api/chats/delete/${chatId}`);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}

export const renameChat = async (chatId, title) => {
    try {
        const response = await api.patch(`api/chats/${chatId}`, { title });
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}