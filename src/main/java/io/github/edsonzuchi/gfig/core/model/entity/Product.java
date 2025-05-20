package io.github.edsonzuchi.gfig.core.model.entity;

import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "um")
    private UM um;
    @Lob
    private byte[] media;
    private Boolean lowStockWarning;
    private Double lowStockWarningQuantity;
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
