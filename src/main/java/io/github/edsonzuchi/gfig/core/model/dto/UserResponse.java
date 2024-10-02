package io.github.edsonzuchi.gfig.core.model.dto;

import java.time.LocalDate;

public record UserResponse(
        String email,
        String name,
        LocalDate birthday,
        String role) {
}
