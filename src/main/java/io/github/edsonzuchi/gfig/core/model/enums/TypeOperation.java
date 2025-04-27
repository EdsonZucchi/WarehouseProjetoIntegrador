package io.github.edsonzuchi.gfig.core.model.enums;

public enum TypeOperation {
    SUM(1, "Operation sum"),
    RECEIVE(2, "Operation receive"),
    REDUCE(3, "Operation reduce");

    private Integer code;
    private String description;

    TypeOperation(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
    
    public Double executeOperation(Double quantityOne, Double quantityTwo) {
        return switch (this.code) {
            case 1 -> quantityOne + quantityTwo;
            case 2 -> quantityTwo;
            case 3 -> quantityOne - quantityTwo;
            default -> throw new IllegalArgumentException("Invalid operation");
        };
    }
}
