package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.request.LoginRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.UserRequest;
import io.github.edsonzuchi.gfig.core.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody UserRequest userRequest) {
        try {
            return ResponseEntity.ok(userService.createUser(userRequest));
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.loginUser(loginRequest);
            return ResponseEntity.ok(token);
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @GetMapping
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(userService.getUsers());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<Object> admin() {
        try {
            return ResponseEntity.ok(userService.createAdmin());
        }catch (UserException ue) {
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @GetMapping("/valid")
    public ResponseEntity<Object> valid() {
        return ResponseEntity.ok("Ok");
    }

    @GetMapping("/role")
    public ResponseEntity<Object> getRoles() {
        try {
            return ResponseEntity.ok(userService.getRoles());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

}
