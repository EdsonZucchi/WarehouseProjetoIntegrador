package io.github.edsonzuchi.gfig.core.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "stocks")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(StockId.class)
public class Stock {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_warehouse", nullable = true)
    private Warehouse warehouse;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_product", nullable = true)
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_variant", nullable = false)
    private Variant variant;

    private Double quantity;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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
