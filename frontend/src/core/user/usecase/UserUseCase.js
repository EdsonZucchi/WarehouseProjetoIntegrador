import { userRepository } from "../repository/UserRepository";

class UserUseCase {
    async login(login, password){
        return userRepository.login(login, password)
    }
}

export const userUseCase = new UserUseCase();