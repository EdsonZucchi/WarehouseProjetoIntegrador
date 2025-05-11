package io.github.edsonzuchi.gfig.core.model.dto.request;

import java.util.List;

public record ProductRequest(
        Long id,
        String name,
        String description,
        String um,
        Boolean lowStockWarning,
        Double lowStockQuantity,
        List<VariantRequest> variants
) {
}
