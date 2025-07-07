package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

}
