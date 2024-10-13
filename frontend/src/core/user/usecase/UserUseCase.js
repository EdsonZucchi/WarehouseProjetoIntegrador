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

    async createUser() {
        return userRepository.createUser();
    }
}

export const userUseCase = new UserUseCase();