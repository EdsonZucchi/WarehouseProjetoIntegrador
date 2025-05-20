package io.github.edsonzuchi.gfig.infra.security;

import io.github.edsonzuchi.gfig.core.model.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new SecurityException("Authentication object is null");
        }

        if (!auth.isAuthenticated()) {
            throw new SecurityException("User not authenticated");
        }

        return (User) auth.getPrincipal();
    }

    public static boolean isAuthenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated();
    }
}
