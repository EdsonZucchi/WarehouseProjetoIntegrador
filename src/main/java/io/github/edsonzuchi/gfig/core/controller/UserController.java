package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.LoginDto;
import io.github.edsonzuchi.gfig.core.model.dto.UserDto;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.UserService;
import io.github.edsonzuchi.gfig.infra.repository.UserRepository;
import io.github.edsonzuchi.gfig.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody UserDto userDto) {
        try {
            User user = userService.createUser(userDto);
            return ResponseEntity.ok(user);
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto) {
        try {
            String token = userService.loginUser(loginDto);
            return ResponseEntity.ok(token);
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(userService.getUsers());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
