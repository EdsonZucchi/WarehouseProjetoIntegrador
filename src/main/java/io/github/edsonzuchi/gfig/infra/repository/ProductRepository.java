package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
