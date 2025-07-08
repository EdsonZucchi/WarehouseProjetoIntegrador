package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.Request;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.model.enums.StatusRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findAllByUserId(Long userId);
    List<Request> findAllByWarehouseRequested(Warehouse warehouse);
}
