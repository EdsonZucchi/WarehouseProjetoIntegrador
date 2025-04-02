package io.github.edsonzuchi.gfig.core.model.dto.response;

public record VariantResponse(
        Long id,
        String name,
        Integer code,
        byte[] media
) {
}
