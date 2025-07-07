package io.github.edsonzuchi.gfig.core.model.dto.response;

import java.util.List;

public record ProductResponse (
        Long id,
        String name,
        String description,
        UMResponse um,
        Boolean lowStockWarning,
        Double lowStockWarningQuantity,
        List<VariantResponse> variants,
        Double quantityStock,
        String status,
        Integer statusCode
){
}
