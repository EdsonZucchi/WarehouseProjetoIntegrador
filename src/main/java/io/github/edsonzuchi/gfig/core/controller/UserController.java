package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.UserException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ChangePasswordRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.LoginRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.UserRequest;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.UserService;
import io.github.edsonzuchi.gfig.infra.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody UserRequest userRequest) {
        try {
            User user = SecurityUtil.getUser();

            return ResponseEntity.ok(userService.createUser(userRequest, user));
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getUser(id));
        }catch (UserException ue){
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PutMapping("/auth/status/{id}")
    public ResponseEntity<Object> updateStatus(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(userService.updateStatusUser(id));
        } catch (UserException ue) {
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PostMapping("/auth/password/reset/{id}")
    public ResponseEntity<Object> resetPassword(@PathVariable("id") Long id) {
        try {
            userService.resetPassword(id);
            return ResponseEntity.ok("Password reset successful");
        } catch (UserException ue) {
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PostMapping("/auth/password/change/{id}")
    public ResponseEntity<Object> changePassword(@PathVariable("id") Long id, @RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            userService.changePassword(id, changePasswordRequest.oldPassword(), changePasswordRequest.newPassword());
            return ResponseEntity.ok("Password change successful");
        } catch (UserException ue) {
            return ResponseEntity.unprocessableEntity().body(ue.getMessage());
        } catch (Exception e) {
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

    @GetMapping("/me")
    public ResponseEntity<Object> getMe() {
        return ResponseEntity.ok(SecurityUtil.getUser());
    }

}
