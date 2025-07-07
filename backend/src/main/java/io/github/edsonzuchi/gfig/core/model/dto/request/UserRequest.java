package io.github.edsonzuchi.gfig.core.model.dto.request;

import java.time.LocalDate;

public record UserRequest(
        Long id,
        String email,
        String name,
        LocalDate birthday,
        String role
) {
}
