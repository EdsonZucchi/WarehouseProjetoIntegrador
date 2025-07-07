package io.github.edsonzuchi.gfig.core.model.dto.response;

public record RequestResponse (
    Long id,
    UserResponse user,
    WarehouseResponse warehouseRequested,
    WarehouseResponse warehouseReturned,
    String status,
    String bodyRequested,
    String bodyReturned
){
}
