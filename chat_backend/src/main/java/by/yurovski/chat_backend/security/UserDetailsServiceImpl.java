package by.yurovski.chat_backend.security;



import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user=userService.findUserByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        return buildUser(user);
    }
    private org.springframework.security.core.userdetails.User buildUser(User user) {
        String login = user.getLogin();
        String password = user.getPassword();
        boolean enabled = user.isEnabled();
        boolean accountNonExpired = user.isEnabled();
        boolean credentialsNonExpired = user.isEnabled();
        boolean accountNonLocked = user.isEnabled();

        Set<SimpleGrantedAuthority> authorities =user.getRole().getAuthorities();

        org.springframework.security.core.userdetails.User SecurityUser = new org.springframework.security.core.userdetails.User(login, password, enabled,
                accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        return SecurityUser ;
    }
}
