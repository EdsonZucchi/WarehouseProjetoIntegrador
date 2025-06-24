package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ProductRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.VariantRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductVariantStockResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.UMResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Product;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.entity.Variant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    Product saveProduct(ProductRequest request, User user) throws ProductException;
    ProductResponse getProduct(Long id) throws ProductException;
    List<ProductResponse> getProducts(Integer statusCode, String filter);

    Variant saveVariant(VariantRequest request, User user) throws ProductException;

    List<UMResponse> getUms();

    List<ProductVariantStockResponse> getVariantStocks(Long idWarehouse, String filter);
}
