package by.yurovski.chat_backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="messages", schema ="public")
public class Message {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne( fetch=FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne( fetch=FetchType.EAGER)
    @JoinColumn(name="dialog_id")
    private Dialog dialog;
    @Column (name = "message")
    private String message;
    @Column (name = "time")
    private Timestamp time;

    public Message (){}

    public Message (User user, Dialog dialog, String message, Timestamp time) {
        this.user=user;
        this.dialog=dialog;
        this.message=message;
        this.time=time;
    }
}
