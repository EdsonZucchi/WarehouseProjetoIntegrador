package io.github.edsonzuchi.gfig.core.model.enums;

import lombok.Getter;

@Getter
public enum StatusCode {
    ACTIVE(0),
    INACTIVE(1);

    private Integer code;

    StatusCode(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
