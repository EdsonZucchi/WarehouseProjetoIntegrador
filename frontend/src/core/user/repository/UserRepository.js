import { httpHelper } from "../../../shared/api/httpHelper";

class UserRepository {
  async login(login, password) {
    try {
      const response = await httpHelper.post("/user/auth/login", {
        email : login,
        password: password
      });
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
