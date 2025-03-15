package io.github.edsonzuchi.gfig.core.model.dto.request;

import java.time.LocalDate;

public record UserRequest(
        String email,
        String password,
        String name,
        LocalDate birthday,
        String role
) {
}
