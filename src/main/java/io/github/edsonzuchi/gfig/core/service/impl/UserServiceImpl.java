package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.LoginDto;
import io.github.edsonzuchi.gfig.core.model.dto.UserDto;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.UserService;
import io.github.edsonzuchi.gfig.infra.repository.UserRepository;
import io.github.edsonzuchi.gfig.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public User createUser(UserDto userDto) throws Exception {
        Optional<User> user = userRepository.findByEmail(userDto.email());
        if (user.isPresent()) {
            throw UserException.userExists;
        }

        User newUser = new User();
        newUser.setEmail(userDto.email());
        newUser.setPassword(passwordEncoder.encode(userDto.password()));
        newUser.setBirthday(userDto.birthday());
        newUser.setName(userDto.name());

        return this.userRepository.save(newUser);
    }

    @Override
    public String loginUser(LoginDto loginDto) throws Exception {
        Optional<User> optionalUser = this.userRepository.findByEmail(loginDto.email());
        if (optionalUser.isEmpty()){
            throw UserException.userNotFound;
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(loginDto.password(), user.getPassword())) {
            throw UserException.wrongPassword;
        }

        return this.tokenService.generateToken(user);
    }
}
