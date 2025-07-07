import { userRepository } from "../repository/UserRepository";

class UserUseCase {
    async login(login, password){
        return userRepository.login(login, password)
    }

    async validToken() {
        return userRepository.validToken()
    }

    async getUsers() {
        return userRepository.getUsers()
    }

    async createUser(id, email, name, birthday, role) {
        return userRepository.createUser(id, email, name, birthday, role);
    }

    async getRoles() {
        return userRepository.getRoles();
    }

    async getMe() {
        return userRepository.getMe();
    }

    async putStatusUser(id) {
        return userRepository.putStatusUser(id);
    }

    async getUser(id) {
        return userRepository.getUser(id);
    }

    async resetPassword(id) {
        return userRepository.resetPassword(id);
    }

    async changePassword(id, oldPassword, newPassword) {
        return userRepository.changePassword(id, oldPassword, newPassword);
    }
}

export const userUseCase = new UserUseCase();