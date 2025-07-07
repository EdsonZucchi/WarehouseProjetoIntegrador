package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum TypeMovement {
    REQUEST(1, TypeOperation.REDUCE),
    DEVOLUTION(2, TypeOperation.SUM),
    INVENTORY(3, TypeOperation.RECEIVE),
    ADDITION(4, TypeOperation.SUM),
    REMOVE(5, TypeOperation.REDUCE);
    
    private final Integer code;
    private final TypeOperation operation;

    TypeMovement(Integer code, TypeOperation operation) {
        this.code = code;
        this.operation = operation;
    }

}
