package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.model.dto.request.ProductRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.VariantRequest;
import io.github.edsonzuchi.gfig.core.service.ProductService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Object> getAllProducts(@RequestParam("status") @Nullable Integer status) {
        try {
            return ResponseEntity.ok(productService.getProducts(status));
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
            return ResponseEntity.ok(productService.saveProduct(product));
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
            return ResponseEntity.ok(productService.saveVariant(variant));
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
}
