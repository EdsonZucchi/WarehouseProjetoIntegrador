package io.github.edsonzuchi.gfig.core.model.dto.response;

import java.time.LocalDate;

public record UserResponse(
        Long id,
        String email,
        String name,
        LocalDate birthday,
        String role,
        Integer status) {
}
