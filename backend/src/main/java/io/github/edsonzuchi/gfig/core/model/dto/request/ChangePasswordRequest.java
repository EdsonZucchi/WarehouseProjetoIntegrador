package io.github.edsonzuchi.gfig.core.model.dto.request;

public record ChangePasswordRequest(
        String oldPassword,
        String newPassword
) {
}
