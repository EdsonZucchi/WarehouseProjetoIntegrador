package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.request.LoginRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.RoleResponse;
import io.github.edsonzuchi.gfig.core.model.dto.request.UserRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.UserResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.model.enums.UserRole;
import io.github.edsonzuchi.gfig.core.service.UserService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.UserRepository;
import io.github.edsonzuchi.gfig.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final UtilsService utilsService;
    private final TokenService tokenService;
    @Value("${default.password}")
    private String DEFAULT_PASSWORD;

    @Override
    public UserResponse createUser(UserRequest userRequest, User userCreated) throws Exception {
        UserRole role = UserRole.getRoleOfKey(userRequest.role());
        if (role == null) {
            throw UserException.ROLE_NOT_FOUND;
        }

        User savedUser;
        if (userRequest.id() != null) {
            var optional = userRepository.findById(userRequest.id());
            if (optional.isEmpty()) {
                throw UserException.USER_NOT_FOUND;
            }
            savedUser = optional.get();
        } else {
            Optional<User> user = userRepository.findByEmail(userRequest.email());
            if (user.isPresent()) {
                throw UserException.USER_EXISTS;
            }

            savedUser = new User();
            savedUser.setEmail(userRequest.email());
            savedUser.setPassword(passwordEncoder.encode(DEFAULT_PASSWORD));
            savedUser.setCreatedUser(userCreated);
        }

        savedUser.setBirthday(userRequest.birthday());
        savedUser.setName(userRequest.name());
        savedUser.setRole(role);
        savedUser = this.userRepository.save(savedUser);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getBirthday(),
                savedUser.getRole().getKey(),
                savedUser.getStatusCode().getCode()
        );
    }

    @Override
    public UserResponse getUser(Long id) throws Exception {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw UserException.USER_NOT_FOUND;
        }

        return utilsService.userResponse(id);
    }

    @Override
    public void resetPassword(Long id) throws Exception {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw UserException.USER_NOT_FOUND;
        }

        user.setPassword(passwordEncoder.encode(DEFAULT_PASSWORD));
        this.userRepository.save(user);
    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword) throws Exception {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw UserException.USER_NOT_FOUND;
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw UserException.WRONG_PASSWORD;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        this.userRepository.save(user);
    }

    @Override
    public String loginUser(LoginRequest loginRequest) throws Exception {
        var optionalUser = this.userRepository.findByEmail(loginRequest.email());
        if (optionalUser.isEmpty()){
            throw UserException.USER_NOT_FOUND;
        }

        var user = optionalUser.get();
        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw UserException.WRONG_PASSWORD;
        }

        if (user.getStatusCode() == StatusCode.INACTIVE) {
            throw UserException.USER_INACTIVE;
        }

        return this.tokenService.generateToken(user);
    }

    @Override
    public List<UserResponse> getUsers() throws Exception {
        List<User> users = this.userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();

        for (User user : users) {
            UserResponse response = new UserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getBirthday(),
                    user.getRole().getLabel(),
                    user.getStatusCode().getCode()
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
            throw UserException.USER_ADMIN_EXISTS;
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

    @Override
    public UserResponse updateStatusUser(Long id) throws Exception {
        User user = this.userRepository.findById(id).orElse(null);
        if (user == null) {
            throw UserException.USER_NOT_FOUND;
        }

        if (user.getStatusCode() == StatusCode.INACTIVE) {
            user.setStatusCode(StatusCode.ACTIVE);
        } else {
            user.setStatusCode(StatusCode.INACTIVE);
        }

        this.userRepository.save(user);

        return utilsService.userResponse(id);
    }
}
