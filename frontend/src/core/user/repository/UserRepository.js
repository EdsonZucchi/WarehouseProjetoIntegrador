import { httpHelper } from "../../../shared/api/httpHelper";
import { User } from "../model/User";
import { Role } from "../model/Role";

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

  async createUser(email, name, password, birthday, role) {
    try { 
      const response = await httpHelper.post("/user/auth/register", {
        email : email, 
        password : password,
        name : name,
        birthday: birthday, 
        role : role
      });
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

  async getRoles() {
    try {
      const response = await httpHelper.get("/user/role");
      if (response.status == 200){
        const data = response.data;
        return data.map(role => new Role(role.key, role.label));
      }else{
        return [];
      }
    }catch (error) {
      console.error(error)
      return [];
    }
  }
}

export const userRepository = new UserRepository();
