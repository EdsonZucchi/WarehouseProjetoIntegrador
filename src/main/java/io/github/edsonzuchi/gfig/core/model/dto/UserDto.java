package io.github.edsonzuchi.gfig.core.model.dto;

import java.time.LocalDate;

public record UserDto(
    String username,
    String password,
    String email,
    String name,
    LocalDate birthday
) {
}
