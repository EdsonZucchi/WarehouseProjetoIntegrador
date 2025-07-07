package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.response.*;
import org.springframework.stereotype.Service;

@Service
public interface UtilsService {

    boolean isEmpty(String str);
    boolean isEmpty(Long str);
    boolean isEmpty(Float str);
    boolean isEmpty(Double str);
    boolean isEmpty(Boolean str);
    boolean isEmpty(Integer str);

    WarehouseResponse warehouseResponse(Long idWarehouse);
    UserResponse userResponse(Long idUser);
    ProductResponse productResponse(Long idProduct);
    VariantResponse variantResponse(Long idVariant);
    RequestResponse requestResponse(Long idRequest);
}
