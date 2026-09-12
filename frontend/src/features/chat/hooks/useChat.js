import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat, renameChat } from "../services/chat.api";
import {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    addMessages,
    createNewChat,
    addNewMessage,
    removeChat,
    renameChat as renameChatInStore,
} from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const data = await sendMessage(message, chatId)
            const { chat, aiMessage } = data
            const activeChatId = chatId || chat._id
            if (!chatId) dispatch(createNewChat({ chatId: activeChatId, title: chat.title }))
            dispatch(addNewMessage({ chatId: activeChatId, content: message, role: "user" }))
            dispatch(addNewMessage({
                chatId: activeChatId,
                content: aiMessage.content,
                role: aiMessage.role === "ai" ? "assistant" : aiMessage.role,
            }))
            dispatch(setCurrentChatId(activeChatId))
        } catch (error) {
            dispatch(setError(error?.message || "Unable to send your message."))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        try {
            const data = await getChats()
            const { chats } = data
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[ chat._id ] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt,
                }
                return acc
            }, {})))
        } catch (error) {
            dispatch(setError(error?.message || "Unable to load your chats."))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleOpenChat(chatId, chats) {

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role === "ai" ? "assistant" : msg.role,
                timestamp: msg.createdAt,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    async function handleRenameChat(chatId, title) {
        const data = await renameChat(chatId, title)
        dispatch(renameChatInStore({ chatId, title: data.chat.title }))
    }

    async function handleDeleteChat(chatId) {
        await deleteChat(chatId)
        dispatch(removeChat(chatId))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleOpenChat,
        handleGetChats,
        handleRenameChat,
        handleDeleteChat,
    }
}