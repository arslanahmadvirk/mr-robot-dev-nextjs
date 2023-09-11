import Repository, { baseUrl, getError } from './genericRepository';

const routes = {
    createChat: '/chat/',
    getUserChats: '/chat/',
    findUsersChat: '/chat/findChat/',
    createMessage: '/chat/createMessage',
    getMessages: '/chat/getMessages/',
    createChatUser: '/users/chatusers',
    sendChatLink: '/users/send-chatlink',
    getChatByLink: '/chat/get-chat-by-link',
};

class ChatsRepositiory {
    async createChat(payload) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.createChat}`,
                payload
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }

    async getUserChats(userId) {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getUserChats}${userId}`
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }

    async findUsersChat(payload) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.findUsersChat}`,
                payload
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
    async createMessage(payload) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.createMessage}`,
                payload
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
    async getMessages(chatId) {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getMessages}${chatId}`
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
    async createChatUser(userData) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.createChatUser}`,
                userData
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
    async sendChatLink(chatdata) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.sendChatLink}`,
                chatdata
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
    async getChatByLink(token) {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getChatByLink}?token=${token}`
            );
            const { data } = request;
            return { result: data };
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new ChatsRepositiory();
