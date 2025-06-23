package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.request.WarehouseRequest;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.WarehouseService;
import io.github.edsonzuchi.gfig.infra.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/warehouse")
@RequiredArgsConstructor
public class WarehouseController {

    private final WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<Object> getAllWarehouses() {
        try {
            return ResponseEntity.ok(warehouseService.getWarehouses());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getWarehouseById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(warehouseService.getWarehouse(id));
        }catch (WarehouseException we){
            return ResponseEntity.unprocessableEntity().body(we.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Object> saveWarehouse(@RequestBody WarehouseRequest warehouse) {
        try {
            User user = SecurityUtil.getUser();

            return ResponseEntity.ok(warehouseService.saveWarehouse(warehouse, user));
        }catch (WarehouseException we){
            return ResponseEntity.unprocessableEntity().body(we.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Object> putWarehouseStatus(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();

            return ResponseEntity.ok(warehouseService.putStatusWarehouse(id, user));
        }catch (WarehouseException we){
            return ResponseEntity.unprocessableEntity().body(we.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Error processing request");
        }
    }
}
