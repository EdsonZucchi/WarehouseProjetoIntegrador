package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum StatusCode {
    ACTIVE(0, "ACTIVE"),
    INACTIVE(1, "INACTIVE"),;

    private Integer code;
    private String description;

    StatusCode(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
