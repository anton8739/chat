package by.yurovski.chat_backend.dto;

import by.yurovski.chat_backend.entity.Message;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class MessageDto {
    private int userId;
    private int dialogId;
    private String username;
    private String message;
    private Timestamp time;
    public MessageDto(){
        this.username = null;
        this.message = null;
    }
    public MessageDto(Message message) {
        this.userId =message.getUser().getId();
        this.dialogId = message.getDialog().getId();
        this.time=message.getTime();
        this.username = message.getUser().getName();
        this.message = message.getMessage();
    }
    public String toJson() {

        return "{\"userId\":"+userId+",\"dialogId\":"+dialogId+",\"username\":\""+username+"\",\"message\":\""+message
                +"\",\"time\":\""+time.toString()+"\"}";
    }
}
