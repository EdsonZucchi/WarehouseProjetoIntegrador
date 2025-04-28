package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.UM;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UMRepository extends JpaRepository<UM, String> {

    List<UM> findByStatusCode(StatusCode statusCode);
}
