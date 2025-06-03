package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.RequestItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestItemRepository extends JpaRepository<RequestItem, Long> {

    List<RequestItem> findByRequestId(Long requestId);
}
