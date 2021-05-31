package by.yurovski.chat_backend.enums;

public enum PermissonEnum {

    ADMIN_ACCESS("admin-access"),
    MODERATOR_ACCESS("moderator-access"),
    CLIENT_ACCESS("client-access");

    private final String permission;

    PermissonEnum(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }

}
