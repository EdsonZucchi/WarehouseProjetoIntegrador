package io.github.edsonzuchi.gfig.core.model.dto.response;

public record RequestItemResponse(
        Long id,
        RequestResponse request,
        ProductResponse product,
        VariantResponse variant,
        Double quantity
) {
}
