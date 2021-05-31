package by.yurovski.chat_backend.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static by.yurovski.chat_backend.enums.PermissonEnum.*;

public enum RoleEnum {


    ADMIN(Set.of(ADMIN_ACCESS, MODERATOR_ACCESS, CLIENT_ACCESS)),
    MODERATOR(Set.of(MODERATOR_ACCESS, CLIENT_ACCESS)),
    CLIENT(Set.of(CLIENT_ACCESS));

    RoleEnum(Set<PermissonEnum> permissions) {
        this.permissions = permissions;
    }
    private final Set<PermissonEnum> permissions;

    public Set<PermissonEnum> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }

}
