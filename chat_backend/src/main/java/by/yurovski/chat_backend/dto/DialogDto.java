package by.yurovski.chat_backend.dto;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.Message;
import by.yurovski.chat_backend.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class DialogDto {
    private int id;
    private int partnerId;
    private int last;
    private String img;
    private String title;
    private String status;
    private MessageDto messages;

    public DialogDto(Dialog dialog, User partner, MessageDto messages) {
        this.id = dialog.getId();
        this.title=partner.getName();
        this.partnerId=partner.getId();
        this.img=partner.getImg();
        this.status = dialog.getStatus().toString();
        this.last=dialog.getLast_active_user_id();
        this.messages = messages;
    }
    public DialogDto(int id) {
        this.id = id;
        this.messages = null;
    }
}
