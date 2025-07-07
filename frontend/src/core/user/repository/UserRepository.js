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
        throw Error(response.data)
      }
    } catch (error) {
      throw error
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
        return usersData.map(user => new User(user.id, user.email, user.name, user.birthday, user.role, user.status));
      }else{
        return [];
      }
    }catch (error) {
      console.error(error)
      return [];
    }
  }

  async createUser(id, email, name, birthday, role) {
    try { 
      const response = await httpHelper.post("/user/auth/register", {
        id: id,
        email : email, 
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

  async putStatusUser(id) {
    try { 
      const response = await httpHelper.put("/user/auth/status/"+id);
      if (response.status == 200){
        return response.data;
      }else{
        throw Error(response.data); 
      }
    }catch (error) {
      throw error;
    }
  }

  async resetPassword(id) {
    try { 
      const response = await httpHelper.post("/user/auth/password/reset/"+id);
      if (response.status == 200){
        return response.data;
      }else{
        throw Error(response.data); 
      }
    }catch (error) {
      throw error;
    }
  }

  async changePassword(id, oldPassword, newPassword) {
    try { 
      const response = await httpHelper.post("/user/auth/password/change/"+id,
        {
          "oldPassword" : oldPassword,
          "newPassword" : newPassword
        }
      );
      if (response.status == 200){
        return response.data;
      }else{
        throw Error(response.data); 
      }
    }catch (error) {
      throw error;
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

  async getMe() {
    try {
      const response = await httpHelper.get("/user/me");
      if (response.status == 200){
        let data = response.data;
        return new User(data.id, data.email, data.name, data.birthday, data.role, data.status)
      }else{
        return new User(0, "", "", "", "", 0)
      }
    }catch (error) {
      console.error(error)
      return new User(0, "", "", "", "", 0)
    }
  }

  async getUser(id) {
    try {
      const response = await httpHelper.get("/user/"+id);
      if (response.status == 200) {
        let data = response.data;
        return new User(data.id, data.email, data.name, data.birthday, data.role, data.status)
      }
      throw Error(response.data);
    }catch (error) {
      throw error
    }
  }
}

export const userRepository = new UserRepository();
