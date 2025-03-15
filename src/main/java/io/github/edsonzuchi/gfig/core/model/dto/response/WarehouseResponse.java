package io.github.edsonzuchi.gfig.core.model.dto.response;

public record WarehouseResponse(
        Long id,
        String name,
        Boolean disabled,
        byte[] media
) {
}
