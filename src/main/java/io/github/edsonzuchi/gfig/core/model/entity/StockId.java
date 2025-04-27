package io.github.edsonzuchi.gfig.core.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockId implements Serializable {

    private Warehouse warehouse;
    private Product product;
    private Variant variant;
}
