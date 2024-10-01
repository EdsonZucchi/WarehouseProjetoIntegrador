package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.LoginDto;
import io.github.edsonzuchi.gfig.core.model.dto.UserDto;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User createUser(UserDto userDto) throws Exception;
    String loginUser(LoginDto loginDto) throws Exception;
}