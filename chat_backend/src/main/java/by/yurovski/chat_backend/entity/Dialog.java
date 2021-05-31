package by.yurovski.chat_backend.entity;

import by.yurovski.chat_backend.enums.MessageStatusEnum;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name="dialog", schema ="public")
public class Dialog {
    public Dialog (){
        this.status=MessageStatusEnum.DELIVERED;
        this.last_active_user_id=1;
    }
    public Dialog ( int id){
        this.id=id;
    }
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column (name = "status")
    @Enumerated(value = EnumType.STRING)
    private MessageStatusEnum status;
    @Column (name = "last_active_user_id")
    private int last_active_user_id;


}
