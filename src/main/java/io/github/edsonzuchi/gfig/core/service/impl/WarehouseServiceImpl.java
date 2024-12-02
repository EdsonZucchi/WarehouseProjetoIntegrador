package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.WarehouseDto;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.core.service.WarehouseService;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final UtilsService utilsService;

    @Override
    public Warehouse saveWarehouse(WarehouseDto dto) {
        if (utilsService.isNullOrBlank(dto.name())) {
            throw WarehouseException.NAME_IS_BLANK;
        }
        Warehouse warehouse;
        if (dto.id() == null){
            warehouse = new Warehouse();
        }else{
            warehouse = warehouseRepository.findById(dto.id()).orElse(null);
            if (warehouse == null) {
                throw WarehouseException.WAREHOUSE_NOT_FOUND;
            }
        }
        warehouse.setName(dto.name());
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public Warehouse putStatusWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        warehouse.setDisabled(!warehouse.getDisabled());
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public List<Warehouse> getWarehouses() {
        return warehouseRepository.findAll();
    }

    @Override
    public Warehouse getWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        return warehouse;
    }
}
