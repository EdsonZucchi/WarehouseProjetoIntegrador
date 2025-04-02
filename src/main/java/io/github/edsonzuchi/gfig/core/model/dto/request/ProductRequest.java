package io.github.edsonzuchi.gfig.core.model.dto.request;

public record ProductRequest(
        Long id,
        String name,
        String description,
        String um,
        Boolean lowStockWarning,
        Double lowStockQuantity
) {
}
