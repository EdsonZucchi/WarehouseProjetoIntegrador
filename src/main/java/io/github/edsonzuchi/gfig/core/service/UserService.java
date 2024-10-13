package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.LoginDto;
import io.github.edsonzuchi.gfig.core.model.dto.RoleResponse;
import io.github.edsonzuchi.gfig.core.model.dto.UserDto;
import io.github.edsonzuchi.gfig.core.model.dto.UserResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserResponse createUser(UserDto userDto) throws Exception;
    String loginUser(LoginDto loginDto) throws Exception;
    List<UserResponse> getUsers() throws Exception;
    String createAdmin() throws Exception;
    List<RoleResponse> getRoles() throws Exception;
}