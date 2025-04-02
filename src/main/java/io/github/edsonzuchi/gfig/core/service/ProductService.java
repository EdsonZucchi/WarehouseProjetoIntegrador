package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ProductRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.VariantRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Product;
import io.github.edsonzuchi.gfig.core.model.entity.Variant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    Product saveProduct(ProductRequest request) throws ProductException;
    ProductResponse getProduct(Long id) throws ProductException;
    List<ProductResponse> getProducts(Integer statusCode);

    Variant saveVariant(VariantRequest request) throws ProductException;
}
