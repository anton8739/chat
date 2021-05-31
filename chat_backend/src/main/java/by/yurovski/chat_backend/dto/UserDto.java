package by.yurovski.chat_backend.dto;

import by.yurovski.chat_backend.entity.User;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserDto {
    private int id;
    private String username;
    private String userSurname;
    private String img;
    private String token;
    private Timestamp time;
    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getName();
        this.userSurname=user.getSurname();
        this.img=user.getImg();
        this.time=user.getTime();
        this.token=null;
    }
    public UserDto(User user, String token) {
        this.id = user.getId();
        this.username = user.getName();
        this.userSurname=user.getSurname();
        this.img=user.getImg();
        this.time=user.getTime();
        this.token=token;
    }
}
