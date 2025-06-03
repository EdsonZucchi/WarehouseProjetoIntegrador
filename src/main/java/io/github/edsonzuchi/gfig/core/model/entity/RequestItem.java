package io.github.edsonzuchi.gfig.core.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "request_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_request", nullable = false)
    private Request request;
    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_variant", nullable = true)
    private Variant variant;
    private Double quantityRequested;
    private Double quantityReturned;
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
