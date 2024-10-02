package io.github.edsonzuchi.gfig.core.model.enums;

public enum UserRole {
    ADMIN("admin"),
    MANAGER("manager"),
    REQUESTER("requester");

    private String key;

    UserRole(String key) {
        this.key = key;
    }

    public static UserRole getRoleOfKey(String key) {
        for (UserRole role : values()) {
            if (role.key.equals(key)) {
                return role;
            }
        }

        return null;
    }

    public String getKey() {
        return key;
    }
}
