import { httpHelper } from "../../../shared/api/httpHelper";
import { User } from "../model/User";

class UserRepository {
  async login(login, password) {
    try {
      const response = await httpHelper.post("/user/auth/login", {
        email : login,
        password: password
      });
      if (response.status == 200) {
        return response.data;
      }else{
        return "";
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  async validToken(){
    try {
      const response = await httpHelper.get("/user/valid");
      if (response.status == 200) {
        return response.data;
      }else{
        return null
      }
    }catch (error) {
      return null;
    }
  }

  async getUsers(){
    try {
      const response = await httpHelper.get("/user");
      if (response.status == 200){
        const usersData = response.data;
        return usersData.map(user => new User(user.email, user.name, user.birthday, user.role));
      }else{
        return [];
      }
    }catch (error) {
      console.error(error)
      return [];
    }
  }

  async createUser() {
    try { 
      const response = await httpHelper.post("/auth/register");
      if (response.status == 200){
        return response.data;
      }else{
        return null;
      }
    }catch (error) {
      console.error(error);
      return null; 
    }
  }
}

export const userRepository = new UserRepository();
