package io.github.edsonzuchi.gfig.core.model.dto;

public record ProductResponse (
    Long id,
    String name,
    Double quantity,
    Long idWarehouse
){}
