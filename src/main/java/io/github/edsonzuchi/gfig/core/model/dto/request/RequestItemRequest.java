package io.github.edsonzuchi.gfig.core.model.dto.request;

public record RequestItemRequest(
        Long id,
        Long idRequest,
        Long idProduct,
        Long idVariant,
        Double quantity
) {
}
