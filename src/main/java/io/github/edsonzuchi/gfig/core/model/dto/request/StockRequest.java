package io.github.edsonzuchi.gfig.core.model.dto.request;

public record StockRequest(
        Long idWarehouse,
        Long idVariant,
        Double quantity
) {
}
