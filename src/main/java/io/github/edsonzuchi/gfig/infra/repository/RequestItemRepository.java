package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.Request;
import io.github.edsonzuchi.gfig.core.model.entity.RequestItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RequestItemRepository extends JpaRepository<RequestItem, Long> {

    List<RequestItem> findByRequestId(Long requestId);
    Optional<RequestItem> findByRequestIdAndVariantId(Long requestId, Long variantId);
    void deleteByRequest(Request request);
}
