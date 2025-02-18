package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.ProductDto;
import io.github.edsonzuchi.gfig.core.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<Object> getProductsPerWarehouse(@PathVariable("id") Long warehouseId) {
        try {
            return ResponseEntity.ok(productService.getProductsPerWarehouse(warehouseId));
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductsPerId(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(productService.getProduct(id));
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Object> saveProduct(@RequestBody ProductDto dto) {
        try {
            return ResponseEntity.ok(productService.saveProduct(dto));
        } catch (ProductException | WarehouseException e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
