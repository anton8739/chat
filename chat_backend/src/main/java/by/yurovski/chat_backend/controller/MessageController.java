package by.yurovski.chat_backend.controller;

import by.yurovski.chat_backend.dto.MessageDto;
import by.yurovski.chat_backend.dto.UserDto;
import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.Message;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.enums.MessageStatusEnum;
import by.yurovski.chat_backend.service.DialogService;
import by.yurovski.chat_backend.service.MessageService;
import by.yurovski.chat_backend.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private MessageService messageService;
    @Autowired
    private DialogService dialogService;
    @Autowired
    private UserService userService;

    @MessageMapping("/chat/{id}")
    public void getMessage(@DestinationVariable int id, MessageDto msg) throws Exception {
        // Thread.sleep(1000); // simulated delay
        User user =userService.getUser(msg.getUserId());
        Dialog dialog = dialogService.getDialogById(id);
        Message message = new Message(user,
                dialogService.getDialogById(id), msg.getMessage(), msg.getTime());
        message = messageService.saveMessage(message);
        msg = new MessageDto(message);
        User partner = userService.getDialogPartner(user,  dialog);
        dialog.setLast_active_user_id(msg.getUserId());
        dialog.setStatus(MessageStatusEnum.RECEIVED);
        dialogService.save(dialog);
        messagingTemplate.convertAndSend("/topic/chat/" + id, msg.toJson());
        messagingTemplate.convertAndSend("/topic/account/" + partner.getId(), msg.toJson());
    }


    @GetMapping("/app/message/getMessageListByDialogId/{id}/{page}")
    public List<MessageDto> getMessageList(@PathVariable("id") int id,@PathVariable("page") int page) {
        List<Message> messages = messageService.getMessageListByDialog(new Dialog(id));

        int size = messages.size();
        int onPage = 2;
        int start =page*onPage-onPage;
        int end=page*onPage;
        if (size==1 && page==1) {
            end=1;
        }
        if (end > size) {
            return null;
        }
        List<MessageDto> messageDtos = messages.stream().sorted(
                (o1, o2) -> {
                   if(o1.getTime().getTime() > o2.getTime().getTime() ) {
                       return -1;
                   } else {
                       return 1;
                   }
                }
        ).map(message -> new MessageDto(message))
                .collect(Collectors.toList());


        return  new ArrayList<>(messageDtos).subList(start, end);
    }

}
