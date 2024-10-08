package io.github.edsonzuchi.gfig.core.model.dto;

import java.time.LocalDate;

public record UserDto(
        String email,
        String password,
        String name,
        LocalDate birthday,
        String role
) {
}
