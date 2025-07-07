package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.request.LoginRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.RoleResponse;
import io.github.edsonzuchi.gfig.core.model.dto.request.UserRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.UserResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserResponse createUser(UserRequest userRequest, User user) throws Exception;
    UserResponse getUser(Long id) throws Exception;
    void resetPassword(Long id) throws Exception;
    void changePassword(Long id, String oldPassword, String newPassword) throws Exception;
    UserResponse updateStatusUser(Long id) throws Exception;
    String loginUser(LoginRequest loginRequest) throws Exception;
    List<UserResponse> getUsers() throws Exception;
    String createAdmin() throws Exception;
    List<RoleResponse> getRoles() throws Exception;
}