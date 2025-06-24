package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ProductRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.VariantRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductVariantStockResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.UMResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.VariantResponse;
import io.github.edsonzuchi.gfig.core.model.entity.*;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.service.ProductService;
import io.github.edsonzuchi.gfig.infra.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final UMRepository umRepository;
    private final UtilsServiceImpl utilsServiceImpl;
    private final StockRepository stockRepository;
    private final WarehouseRepository warehouseRepository;

    @Override
    public Product saveProduct(ProductRequest request, User user) throws ProductException {
        if (utilsServiceImpl.isEmpty(request.name())) {
            throw ProductException.NAME_IS_BLANK;
        }
        if (utilsServiceImpl.isEmpty(request.description())) {
            throw ProductException.DESCRIPTION_IS_BLANK;
        }
        if (utilsServiceImpl.isEmpty(request.um())) {
            throw ProductException.UM_IS_BLANK;
        }

        UM um = umRepository.findById(request.um()).orElse(null);
        if (um == null) {
            throw ProductException.UM_INVALID;
        }

        Product product;
        if (request.id() == null) {
            product = new Product();
            product.setCreatedUser(user);
        } else {
            product = productRepository.findById(request.id()).orElse(null);
            if (product == null) {
                throw ProductException.PRODUCT_NOT_FOUND;
            }
            product.setUpdatedUser(user);
        }

        product.setName(request.name());
        product.setDescription(request.description());
        product.setUm(um);
        product.setLowStockWarning(request.lowStockWarning() != null ? request.lowStockWarning() : false);
        product.setLowStockWarningQuantity(request.lowStockQuantity() != null ? request.lowStockQuantity() : 0);

        product = productRepository.save(product);

        if (request.variants() != null) {
            for (VariantRequest variantRequest : request.variants()) {
                VariantRequest variant = new VariantRequest(variantRequest.id(), product.getId(), variantRequest.name(), variantRequest.code());
                saveVariant(variant, user);
            }
        }

        return product;
    }

    @Override
    public ProductResponse getProduct(Long id) throws ProductException {
        if (utilsServiceImpl.isEmpty(id)) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }

        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }

        var listVariants = variantRepository.findByProductId(product.getId());
        List<VariantResponse> variantsResponse = new ArrayList<>();
        for (Variant variant : listVariants) {
            variantsResponse.add(new VariantResponse(
                    variant.getId(),
                    variant.getName(),
                    variant.getCode(),
                    variant.getStatusCode().getTranslate()
            ));
        }

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                new UMResponse(
                        product.getUm().getAcronym(),
                        product.getUm().getName()
                ),
                product.getLowStockWarning(),
                product.getLowStockWarningQuantity(),
                variantsResponse,
                null,
                product.getStatusCode().getTranslate(),
                product.getStatusCode().getCode()
        );
    }

    @Override
    @Transactional
    public List<ProductResponse> getProducts(Integer statusCode, String filter) {
        List<ProductResponse> responses = new ArrayList<>();

        StatusCode status = null;
        try {
            status = StatusCode.valueOf(statusCode.toString());
        } catch (Exception ignored) {}

        var products = productRepository.findAll();

        for (Product product : products) {
            if (status != null) {
                if (product.getStatusCode() != status) {
                    continue;
                }
            }

            if (product.notContainsFilter(filter)) {
                continue;
            }

            var stocks = stockRepository.findByProductId(product.getId());
            double quantity = 0;
            for (Stock stock : stocks) {
                quantity += stock.getQuantity();
            }

            responses.add(new ProductResponse(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    new UMResponse(
                            product.getUm().getAcronym(),
                            product.getUm().getName()
                    ),
                    product.getLowStockWarning(),
                    product.getLowStockWarningQuantity(),
                    List.of(),
                    quantity,
                    product.getStatusCode().getTranslate(),
                    product.getStatusCode().getCode()
            ));
        }

        return responses;
    }

    @Override
    public Variant saveVariant(VariantRequest request, User user) throws ProductException {
        if (utilsServiceImpl.isEmpty(request.name())) {
            throw ProductException.NAME_IS_BLANK;
        }
        if (utilsServiceImpl.isEmpty(request.code())) {
            throw ProductException.CODE_IS_BLANK;
        }
        if (utilsServiceImpl.isEmpty(request.idProduct())) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }

        Product product = productRepository.findById(request.idProduct()).orElse(null);
        if (product == null) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }

        Variant variant;
        if (request.id() == null) {
            variant = new Variant();
            variant.setCreatedUser(user);
        } else {
            variant = variantRepository.findById(request.id()).orElse(null);
            if (variant == null) {
                throw ProductException.VARIANT_NOT_FOUND;
            }
            variant.setUpdatedUser(user);
        }

        variant.setName(request.name());
        variant.setCode(request.code());
        variant.setProduct(product);
        return variantRepository.save(variant);
    }

    @Override
    public List<UMResponse> getUms() {
        var list = umRepository.findByStatusCode(StatusCode.ACTIVE);
        List<UMResponse> response = new ArrayList<>();

        for (UM um : list) {
            response.add(new UMResponse(
                    um.getAcronym(),
                    um.getName()
            ));
        }

        return response;
    }

    @Override
    public List<ProductVariantStockResponse> getVariantStocks(Long idWarehouse, String filter) {
        List<ProductVariantStockResponse> productVariantStockResponses = new ArrayList<>();

        var warehouse = warehouseRepository.findById(idWarehouse).orElse(null);
        if (warehouse == null) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }

        var variants = variantRepository.findAll();
        for (Variant variant : variants) {
            var product = variant.getProduct();

            if (product.notContainsFilter(filter) && variant.notContainsFilter(filter)) {
                continue;
            }

            Double quantityStock = 0.0;
            var optionalStock = stockRepository.findById(new StockId(warehouse, product, variant));
            if (optionalStock.isPresent()) {
                quantityStock = optionalStock.get().getQuantity();
            }

            productVariantStockResponses.add(new ProductVariantStockResponse(
                    new ProductResponse(
                            product.getId(),
                            product.getName(),
                            null,
                            new UMResponse(
                                    product.getUm().getAcronym(),
                                    null
                            ),
                            null, null, null, null, null, null
                    ),
                    new VariantResponse(
                            variant.getId(),
                            variant.getName(),
                            variant.getCode(),
                            null
                    ),
                    quantityStock,
                    null,
                    null
            ));
        }

        return productVariantStockResponses;
    }
}
