package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum StatusCode {
    ACTIVE(0, "ACTIVE", "ATIVO"),
    INACTIVE(1, "INACTIVE", "INATIVO"),;

    private Integer code;
    private String description;
    private String translate;

    StatusCode(Integer code, String description, String translate) {
        this.code = code;
        this.description = description;
        this.translate = translate;
    }

    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
