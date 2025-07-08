package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping("/movements")
    public ResponseEntity<Object> getMovements(@RequestParam String filter, @RequestParam Long warehouse, @RequestParam String user) {
        try {
            return ResponseEntity.ok(stockService.getMovements(filter, warehouse, user));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
