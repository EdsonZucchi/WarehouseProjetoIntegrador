package io.github.edsonzuchi.gfig.core.model.dto.response;

public record ProductVariantStockResponse(
        ProductResponse product,
        VariantResponse variant,
        Double stockQuantity,
        Double selectQuantity,
        Double returnQuantity,
        Double pendingQuantity
) {
}
