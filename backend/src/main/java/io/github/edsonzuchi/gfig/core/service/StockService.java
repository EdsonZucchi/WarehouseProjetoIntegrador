package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.StockMovementResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StockService {

    Stock StockRegister(StockRelease stockRelease, User user) throws StockException;
    void StockListRegister(List<StockRelease> list, User user) throws StockException;
    Stock Inventory(StockRequest request, User user) throws StockException;
    List<StockMovementResponse> getMovements(String filter, Long warehouseId, String userName) throws StockException;
}
