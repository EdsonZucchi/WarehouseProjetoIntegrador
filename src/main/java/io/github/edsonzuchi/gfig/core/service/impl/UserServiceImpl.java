package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.LoginDto;
import io.github.edsonzuchi.gfig.core.model.dto.RoleResponse;
import io.github.edsonzuchi.gfig.core.model.dto.UserDto;
import io.github.edsonzuchi.gfig.core.model.dto.UserResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.enums.UserRole;
import io.github.edsonzuchi.gfig.core.service.UserService;
import io.github.edsonzuchi.gfig.infra.repository.UserRepository;
import io.github.edsonzuchi.gfig.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public UserResponse createUser(UserDto userDto) throws Exception {
        Optional<User> user = userRepository.findByEmail(userDto.email());
        if (user.isPresent()) {
            throw UserException.userExists;
        }

        UserRole role = UserRole.getRoleOfKey(userDto.role());
        if (role == null) {
            throw UserException.roleNotFound;
        }

        User newUser = new User();
        newUser.setEmail(userDto.email());
        newUser.setPassword(passwordEncoder.encode(userDto.password()));
        newUser.setBirthday(userDto.birthday());
        newUser.setName(userDto.name());
        newUser.setRole(role);
        this.userRepository.save(newUser);

        return new UserResponse(
                newUser.getEmail(),
                newUser.getName(),
                newUser.getBirthday(),
                newUser.getRole().getKey()
        );
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

    @Override
    public List<UserResponse> getUsers() throws Exception {
        List<User> users = this.userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();

        for (User user : users) {
            UserResponse response = new UserResponse(
                    user.getEmail(),
                    user.getName(),
                    user.getBirthday(),
                    user.getRole().getKey()
            );
            userResponses.add(response);
        }

        userResponses.sort(Comparator.comparing(UserResponse::name));

        return userResponses;
    }

    @Override
    public String createAdmin() throws Exception {
        var user = this.userRepository.findByEmail("admin");
        if (user.isPresent()) {
            throw UserException.userAdminExists;
        }

        User newUser = new User();
        newUser.setEmail("admin");
        newUser.setPassword(passwordEncoder.encode("admin"));
        newUser.setBirthday(LocalDate.now());
        newUser.setName("admin");
        newUser.setRole(UserRole.ADMIN);
        newUser.setIsSystem(true);
        this.userRepository.save(newUser);

        return "User admin create";
    }

    @Override
    public List<RoleResponse> getRoles() throws Exception {
        List<UserRole> list = new ArrayList<>();
        List<RoleResponse> response = new ArrayList<>();

        list.add(UserRole.ADMIN);
        list.add(UserRole.MANAGER);
        list.add(UserRole.REQUESTER);

        for (UserRole userRole : list) {
            response.add(new RoleResponse(userRole.getKey(), userRole.getLabel()));
        }

        return response;
    }
}
