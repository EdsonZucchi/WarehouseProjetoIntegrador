package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.WarehouseDto;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;

public interface WarehouseService {

    Warehouse saveWarehouse(WarehouseDto dto);
    boolean disableWarehouse(Long id);
    boolean enableWarehouse(Long id);
}
