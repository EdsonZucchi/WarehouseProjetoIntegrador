package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.request.WarehouseRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.WarehouseResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.core.service.WarehouseService;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final UtilsService utilsService;

    @Override
    public Warehouse saveWarehouse(WarehouseRequest dto, User user) {
        if (utilsService.isEmpty(dto.name())) {
            throw WarehouseException.NAME_IS_BLANK;
        }
        Warehouse warehouse;
        if (dto.id() == null){
            warehouse = new Warehouse();
            warehouse.setCreatedUser(user);
        }else{
            warehouse = warehouseRepository.findById(dto.id()).orElse(null);
            if (warehouse == null) {
                throw WarehouseException.WAREHOUSE_NOT_FOUND;
            }
            warehouse.setUpdatedUser(user);
        }
        warehouse.setName(dto.name());
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public Warehouse putStatusWarehouse(Long id, User user) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }

        if (warehouse.getStatusCode() == StatusCode.ACTIVE) {
            warehouse.setStatusCode(StatusCode.INACTIVE);
        } else {
            warehouse.setStatusCode(StatusCode.ACTIVE);
        }

        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public List<WarehouseResponse> getWarehouses() {
        List<WarehouseResponse> responses = new ArrayList<>();

        var list = warehouseRepository
                .findAll()
                .stream()
                .sorted(Comparator.comparing(Warehouse::getStatusCode)
                        .thenComparing(Warehouse::getName))
                .toList();

        for (Warehouse warehouse : list) {
            responses.add(new WarehouseResponse(
                            warehouse.getId(),
                            warehouse.getName(),
                            (warehouse.getStatusCode() == StatusCode.INACTIVE),
                            null)
            );
        }

        return responses;
    }

    @Override
    public WarehouseResponse getWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }

        return new WarehouseResponse(
                warehouse.getId(),
                warehouse.getName(),
                (warehouse.getStatusCode() == StatusCode.INACTIVE),
                warehouse.getMedia());
    }

    @Override
    public void uploadWarehouse(Long warehouseId, MultipartFile file) throws WarehouseException {
        var warehouse = warehouseRepository.findById(warehouseId).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }

        try {
            warehouse.setMedia(file.getBytes());
        } catch (IOException ioe) {
            throw WarehouseException.WAREHOUSE_MEDIA_EXCEPTION;
        }

        warehouseRepository.save(warehouse);
    }
}
