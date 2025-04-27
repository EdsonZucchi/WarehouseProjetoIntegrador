package io.github.edsonzuchi.gfig.core.model.dto.response;

import java.util.List;

public record ProductResponse (
        Long id,
        String name,
        String description,
        UMResponse um,
        byte[] media,
        Boolean lowStockWarning,
        Double lowStockWarningQuantity,
        List<VariantResponse> variants,
        Double quantityStock,
        String status
){
}
