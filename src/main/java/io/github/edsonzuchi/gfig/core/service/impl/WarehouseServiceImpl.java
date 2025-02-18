package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.WarehouseDto;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.core.service.WarehouseService;
import io.github.edsonzuchi.gfig.infra.repository.ProductRepository;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final UtilsService utilsService;
    private final ProductRepository productRepository;

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
        final var list = productRepository.findAllByWarehouse_Id(id);
        if (!list.isEmpty()) {
            boolean isProduct = false;
            for (var product : list) {
                if (product.getQuantity() > 0) {
                    isProduct = true;
                }
            }
            if (isProduct) {
                throw WarehouseException.PRODUCTS_IN_WAREHOUSE;
            }
        }

        warehouse.setDisabled(!warehouse.getDisabled());
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public List<Warehouse> getWarehouses() {
        return warehouseRepository.findAll().stream()
                .sorted(Comparator.comparing(Warehouse::getDisabled).thenComparing(Warehouse::getName))
                .collect(Collectors.toList());
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
