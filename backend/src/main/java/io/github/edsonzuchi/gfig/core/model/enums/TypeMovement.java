package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum TypeMovement {
    REQUEST(1, TypeOperation.REDUCE, "Requisição"),
    DEVOLUTION(2, TypeOperation.SUM, "Devolução"),
    INVENTORY(3, TypeOperation.RECEIVE, "Inventário"),
    ADDITION(4, TypeOperation.SUM, "Adição"),
    REMOVE(5, TypeOperation.REDUCE, "Remoção");
    
    private final Integer code;
    private final TypeOperation operation;
    private final String description;

    TypeMovement(Integer code, TypeOperation operation, String description) {
        this.code = code;
        this.operation = operation;
        this.description = description;
    }

}
