package io.github.edsonzuchi.gfig.core.model.dto.request;

import io.github.edsonzuchi.gfig.core.model.enums.TypeMovement;

public record StockRelease(
        Long idWarehouse,
        Long idProduct,
        Long idVariant,
        Double quantity,
        TypeMovement type
) {
}
