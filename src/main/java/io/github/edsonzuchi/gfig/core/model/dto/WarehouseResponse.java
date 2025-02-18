package io.github.edsonzuchi.gfig.core.model.dto;

import java.util.List;

public record WarehouseResponse(
    Long id,
    String name,
    Boolean disabled,
    List<ProductResponse> products
) {
}
