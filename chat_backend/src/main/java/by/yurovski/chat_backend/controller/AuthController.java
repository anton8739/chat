package by.yurovski.chat_backend.controller;

import by.yurovski.chat_backend.dto.AuthRequestDto;
import by.yurovski.chat_backend.dto.UserDto;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.security.jwt.JWTProvider;
import by.yurovski.chat_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/app")
public class AuthController {

    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JWTProvider jwtTokenProvider;
    @Autowired
    @Qualifier("customPasswordEncoder")
    private PasswordEncoder passwordEncoder;

    @PostMapping("auth")
    public UserDto login(@RequestBody AuthRequestDto requestDto) {

        String login = requestDto.getLogin();
        String password = requestDto.getPassword();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        User user = userService.findUserByLogin(login);
        String token = jwtTokenProvider.createToken(login, user.getRole().toString());
        return new UserDto(user, token);
    }
    @PostMapping("registrate")
    public UserDto registrate(@RequestBody AuthRequestDto requestDto) {
        String login = requestDto.getLogin();
        String password = passwordEncoder.encode(requestDto.getPassword());
        String email =requestDto.getEmail();
        String name = requestDto.getName();
        String surname = requestDto.getSurname();
        User user = userService.saveUser(new User(login, password, email, name, surname));
        String token = jwtTokenProvider.createToken(login, user.getRole().toString());
        return new UserDto(user, token);
    }
}
