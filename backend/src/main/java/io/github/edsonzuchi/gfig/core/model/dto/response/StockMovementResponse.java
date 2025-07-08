package io.github.edsonzuchi.gfig.core.model.dto.response;



import java.time.LocalDateTime;

public record StockMovementResponse(
        Long id,
        WarehouseResponse warehouse,
        ProductResponse product,
        VariantResponse variant,
        Double quantity,
        String typeMovement,
        UserResponse user,
        LocalDateTime time
) {
}
