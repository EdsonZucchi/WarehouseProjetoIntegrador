package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import org.springframework.stereotype.Service;

@Service
public interface StockService {

    Stock StockRegister(StockRelease stockRelease) throws StockException;
}
