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

    public boolean isActive() {
        return this.statusCode == StatusCode.ACTIVE;
    }

    public boolean containsFilter(String filter) {
        if (filter == null || filter.isEmpty()) {
            return true;
        }

        String filterLow = filter.toLowerCase();
        String nameFilter = this.name.toLowerCase();
        String codeFilter = this.code.toString().toLowerCase();

        if (nameFilter.equals(filterLow) || nameFilter.contains(filterLow)) {
            return true;
        }

        if (codeFilter.equals(filterLow) || codeFilter.contains(filterLow)) {
            return true;
        }

        return false;
    }

    public boolean notContainsFilter(String filter) {
        return !containsFilter(filter);
    }
}
