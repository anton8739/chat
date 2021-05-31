package by.yurovski.chat_backend.dto;

import lombok.Data;

@Data
public class AuthRequestDto {
    private String login;
    private String password;
    private String email;
    private String name;
    private String surname;
}
