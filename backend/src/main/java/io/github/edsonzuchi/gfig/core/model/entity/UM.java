package io.github.edsonzuchi.gfig.core.model.entity;

import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "ums")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UM {

    @Id
    @Column(length = 3)
    private String acronym;
    private String name;
    @Column(nullable = false)
    private StatusCode statusCode = StatusCode.ACTIVE;;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UM(String acronym) {
        this.acronym = acronym;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
