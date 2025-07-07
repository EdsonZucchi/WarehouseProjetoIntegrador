package io.github.edsonzuchi.gfig.core.model.dto.request;

public record RequestItemRequest(
        Long idRequest,
        Long idVariant,
        Double quantity
) {
}
