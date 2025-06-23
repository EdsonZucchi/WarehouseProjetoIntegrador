package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum StatusRequest {

    TYPING(0, "Typing", "Em digitação", false),
    REQUESTED(1, "Requested", "Requisitado", true),
    ACCEPTED(2, "Accepted", "Aceito", false),
    RETURNED(3, "Returned", "Devolvido", false);

    private Integer code;
    private String description;
    private String translate;
    private boolean approval;

    StatusRequest(Integer code, String description, String translate, boolean approval) {
        this.code = code;
        this.description = description;
        this.translate = translate;
        this.approval = approval;
    }
}
