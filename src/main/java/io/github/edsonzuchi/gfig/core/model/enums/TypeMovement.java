package io.github.edsonzuchi.gfig.core.model.enums;

public enum TypeMovement {
    REQUEST(1, TypeOperation.REDUCE),
    DEVOLUTION(2, TypeOperation.SUM),
    INVENTORY(3, TypeOperation.RECEIVE),
    ADDITION(4, TypeOperation.SUM),
    REMOVE(5, TypeOperation.REDUCE);
    
    private Integer code;
    private TypeOperation operation;

    TypeMovement(Integer code, TypeOperation operation) {
        this.code = code;
        this.operation = operation;
    }

    public Integer getCode() {
        return code;
    }

    public TypeOperation getOperation() {
        return operation;
    }
}
