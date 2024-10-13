package io.github.edsonzuchi.gfig.core.model.enums;

public enum UserRole {
    ADMIN("admin", "Administrador"),
    MANAGER("manager", "Gerente"),
    REQUESTER("requester", "Requisitor");

    private String key;
    private String label;

    UserRole(String key, String label) {
        this.key = key;
        this.label = label;
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

    public String getLabel() {
        return label;
    }
}
