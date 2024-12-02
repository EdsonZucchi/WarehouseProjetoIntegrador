package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.WarehouseDto;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.service.WarehouseService;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Override
    public Warehouse saveWarehouse(WarehouseDto dto) {
        if (dto.name().isBlank()) {
            throw WarehouseException.NAME_IS_BLANK;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setName(dto.name());
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public boolean disableWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        warehouse.setDisabled(true);
        warehouseRepository.save(warehouse);
        return true;
    }

    @Override
    public boolean enableWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        warehouse.setDisabled(false);
        warehouseRepository.save(warehouse);
        return true;
    }
}
