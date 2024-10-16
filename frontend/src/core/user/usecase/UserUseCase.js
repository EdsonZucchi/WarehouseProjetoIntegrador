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

    async createUser(email, name, password, birthday, role) {
        return userRepository.createUser(email, name, password, birthday, role);
    }
}

export const userUseCase = new UserUseCase();