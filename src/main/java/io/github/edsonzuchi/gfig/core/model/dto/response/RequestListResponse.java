package io.github.edsonzuchi.gfig.core.model.dto.response;

import java.util.List;

public record RequestListResponse(
        Long id,
        UserResponse user,
        WarehouseResponse warehouseRequested,
        String status,
        String bodyRequested,
        List<RequestItemResponse> items
) {
}
