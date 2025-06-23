package io.github.edsonzuchi.gfig.core.model.entity;

import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "variants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    private String name;
    private Integer code;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private StatusCode statusCode = StatusCode.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "created_id_user")
    private User createdUser;

    @ManyToOne
    @JoinColumn(name = "updated_id_user")
    private User updatedUser;

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
