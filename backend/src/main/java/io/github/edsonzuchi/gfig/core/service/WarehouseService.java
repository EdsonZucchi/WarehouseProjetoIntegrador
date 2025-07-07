package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.request.WarehouseRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.WarehouseResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface WarehouseService {

    Warehouse saveWarehouse(WarehouseRequest dto, User user);
    Warehouse putStatusWarehouse(Long id, User user);
    List<WarehouseResponse> getWarehouses();
    WarehouseResponse getWarehouse(Long id);

}
