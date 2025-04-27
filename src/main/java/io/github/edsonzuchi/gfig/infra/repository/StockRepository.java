package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.Product;
import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.model.entity.StockId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, StockId> {

    List<Stock> findByProductId(Long productId);
}
