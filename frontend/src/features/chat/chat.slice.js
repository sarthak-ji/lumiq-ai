import { createSlice } from '@reduxjs/toolkit';


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[ chatId ] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[ chatId ].messages.push({ content, role })
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            state.chats[ chatId ].messages.push(...messages)
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages } = chatSlice.actions
export default chatSlice.reducer

// chats = {
//     "Docker and AWS": {
//         messages: [
//             {
//                 role: "user",
//                 content: "What is Docker and how does it work?",
//                 timestamp: "2023-06-01T10:00:00Z"
//             },
//             {
//                 role: "ai",
//                 content: "Docker is a platform that allows developers to package applications into containers. Containers are lightweight, portable, and can run consistently across different environments. Docker uses a client-server architecture where the Docker client communicates with the Docker daemon to build, run, and manage containers.",
//                 timestamp: "2023-06-01T10:01:00Z"
//             }
//         ],
//         id: "Docker and AWS",
//         lastUpdated: "2023-06-01T12:00:00Z"
//     }
// }