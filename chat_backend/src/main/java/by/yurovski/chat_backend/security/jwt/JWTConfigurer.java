package by.yurovski.chat_backend.security.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private JWTProvider jWTProvider;

    public JWTConfigurer(JWTProvider jWTProvider) {
        this.jWTProvider = jWTProvider;
    }

    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        JWTFilter jWTFilter = new JWTFilter(jWTProvider);
        httpSecurity.addFilterBefore(jWTFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
