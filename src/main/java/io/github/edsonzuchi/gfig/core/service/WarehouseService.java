package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.WarehouseDto;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;

import java.util.List;

public interface WarehouseService {

    Warehouse saveWarehouse(WarehouseDto dto);
    Warehouse putStatusWarehouse(Long id);
    List<Warehouse> getWarehouses();
    Warehouse getWarehouse(Long id);

}
