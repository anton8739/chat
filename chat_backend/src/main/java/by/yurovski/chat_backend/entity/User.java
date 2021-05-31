package by.yurovski.chat_backend.entity;

import by.yurovski.chat_backend.enums.RoleEnum;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name="users", schema ="public")
public class User {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="login")
    private  String login;
    @Column (name = "name")
    private String name;
    @Column (name = "surname")
    private String surname;
    @Column (name = "password")
    private String password;
    @Column (name = "email")
    private String email;
    @Column (name = "img")
    private String img;
    @Enumerated(value = EnumType.STRING)
    @Column (name = "role")
    private RoleEnum role;
    @Column (name = "time")
    private Timestamp time;
    @Column (name = "enabled")
    private boolean enabled;
    @ManyToMany( fetch=FetchType.EAGER)
    @JoinTable(
            name = "user_dialog",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "dialog_id"))
    private List<Dialog> dialogs;


    public User (){}

    public User(String login, String password, String email, String name, String surname) {
        this.login=login;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.role=RoleEnum.CLIENT;
        this.time=new Timestamp(System.currentTimeMillis());
        this.enabled=true;
    }

}
