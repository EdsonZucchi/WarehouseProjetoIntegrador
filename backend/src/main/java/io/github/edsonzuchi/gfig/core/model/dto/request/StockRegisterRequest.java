package io.github.edsonzuchi.gfig.core.model.dto.request;

import io.github.edsonzuchi.gfig.core.model.entity.Product;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.entity.Variant;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.model.enums.TypeMovement;

public record StockRegisterRequest (
        Warehouse warehouse,
        Product product,
        Variant variant,
        TypeMovement typeMovement,
        Double quantity,
        User user
){
}
