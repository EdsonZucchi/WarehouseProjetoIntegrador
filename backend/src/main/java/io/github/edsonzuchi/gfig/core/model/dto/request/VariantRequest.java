package io.github.edsonzuchi.gfig.core.model.dto.request;

public record VariantRequest(
        Long id,
        Long idProduct,
        String name,
        Integer code
) {
}
