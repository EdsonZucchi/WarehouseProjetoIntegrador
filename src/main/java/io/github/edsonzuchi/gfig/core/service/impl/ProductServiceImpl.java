package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.ProductDto;
import io.github.edsonzuchi.gfig.core.model.dto.ProductResponse;
import io.github.edsonzuchi.gfig.core.model.dto.WarehouseResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Product;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.service.ProductService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.ProductRepository;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UtilsService utilsService;
    private final WarehouseRepository warehouseRepository;

    @Override
    public WarehouseResponse getProductsPerWarehouse(Long idWarehouse) {
        final var warehouse = this.warehouseRepository.findById(idWarehouse).orElse(null);
        if (warehouse == null) {
            throw new WarehouseException("Warehouse not found");
        }

        final var list = this.productRepository.findAllByWarehouse_Id(idWarehouse);
        List<ProductResponse> listResponse = new ArrayList<>();

        for (var product : list) {
            ProductResponse productResponse = new ProductResponse(
                    product.getId(),
                    product.getName(),
                    product.getQuantity(),
                    product.getWarehouse().getId()
            );
            listResponse.add(productResponse);
        }

        return new WarehouseResponse(
                warehouse.getId(),
                warehouse.getName(),
                warehouse.getDisabled(),
                listResponse
        );
    }

    @Override
    public Product getProduct(Long id) {
        final var product =  this.productRepository.findById(id).orElse(null);
        if (product == null) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }
        return product;
    }

    @Override
    public Product saveProduct(ProductDto dto) {
        if (utilsService.isNullOrBlank(dto.name())) {
            throw ProductException.PRODUCT_NAME_IS_BLANK;
        }
        if (utilsService.isNullOrBlank(dto.warehouse())) {
            throw ProductException.PRODUCT_IS_NOT_WAREHOUSE;
        }
        Product product;
        if (dto.id() == null) {
            product = new Product();
        } else {
            product = this.productRepository.findById(dto.id()).orElse(null);
            if (product == null) {
                throw ProductException.PRODUCT_NOT_FOUND;
            }
        }

        final var productName = this.productRepository.findByName(dto.name()).orElse(null);
        if (productName != null) {
            if (!Objects.equals(productName.getId(), dto.id())) {
                throw ProductException.PRODUCT_ALREADY_EXISTS;
            }
        }

        final var warehouse = this.warehouseRepository.findById(dto.warehouse()).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        if (warehouse.getDisabled()){
            throw WarehouseException.WAREHOUSE_DISABLED;
        }

        product.setName(dto.name());
        product.setWarehouse(warehouse);
        product.setQuantity(dto.quantity());
        this.productRepository.save(product);

        return product;
    }
}
