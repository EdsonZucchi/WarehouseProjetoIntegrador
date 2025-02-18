package io.github.edsonzuchi.gfig.core.model.dto;

public record ProductDto(
        Long id,
        String name,
        Double quantity,
        Long warehouse
) {
}
