package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.ProductDto;
import io.github.edsonzuchi.gfig.core.model.dto.WarehouseResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Product;

public interface ProductService {

    WarehouseResponse getProductsPerWarehouse(Long idWarehouse);
    Product getProduct(Long id);
    Product saveProduct(ProductDto dto);
}
