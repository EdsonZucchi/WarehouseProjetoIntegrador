package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ProductRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.VariantRequest;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.ProductService;
import io.github.edsonzuchi.gfig.core.service.StockService;
import io.github.edsonzuchi.gfig.infra.security.SecurityUtil;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final StockService stockService;

    @GetMapping
    public ResponseEntity<Object> getAllProducts(@RequestParam("status") @Nullable Integer status, @RequestParam String filter) {
        try {
            return ResponseEntity.ok(productService.getProducts(status, filter));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(productService.getProduct(id));
        } catch (ProductException pe) {
            return ResponseEntity.unprocessableEntity().body(pe.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Object> saveProduct(@RequestBody ProductRequest product) {
        try {
            User user = SecurityUtil.getUser();

            return ResponseEntity.ok(productService.saveProduct(product, user));
        } catch (ProductException pe) {
            return ResponseEntity.unprocessableEntity().body(pe.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/variant")
    public ResponseEntity<Object> saveVariant(@RequestBody VariantRequest variant) {
        try {
            User user = SecurityUtil.getUser();

            return ResponseEntity.ok(productService.saveVariant(variant, user));
        } catch (ProductException pe) {
            return ResponseEntity.unprocessableEntity().body(pe.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ums")
    public ResponseEntity<Object> getUmsProducts() {
        try {
            return ResponseEntity.ok(productService.getUms());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/variant/stock/{warehouseId}")
    public ResponseEntity<Object> getVariantStock(@PathVariable Long warehouseId, @RequestParam String filter) {
        try {
            return ResponseEntity.ok(productService.getVariantStocks(warehouseId, filter));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/inventory")
    public ResponseEntity<Object> inventory(@RequestBody StockRequest request) {
        try {
            return ResponseEntity.ok(stockService.Inventory(request));
        } catch (StockException pe) {
            return ResponseEntity.unprocessableEntity().body(pe.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
