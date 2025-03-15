package io.github.edsonzuchi.gfig.infra.repository;

import io.github.edsonzuchi.gfig.core.model.entity.UM;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UMRepository extends JpaRepository<UM, String> {
}
