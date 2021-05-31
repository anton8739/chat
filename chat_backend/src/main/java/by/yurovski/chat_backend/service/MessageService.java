package by.yurovski.chat_backend.service;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.Message;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.repository.MessageRepo;
import by.yurovski.chat_backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;
    @Transactional
    public List<Message> getMessageListByDialog (Dialog dialog) {
        List<Message> list = messageRepo.findByDialog(dialog);
        return list;
    }
    @Transactional
    public Message getLastMessageOfDialog (Dialog dialog) {
        Optional<Message> message = messageRepo.findByDialog(dialog).stream().min( (o1, o2) -> {
            if(o1.getTime().getTime() > o2.getTime().getTime()) {
                return -1;
            } else {
                return 1;
            }
        });
        if ( message.isEmpty()){
            return null;
        }
        return message.get();
    }
    @Transactional
    public Message saveMessage (Message message) {

        return messageRepo.save(message);
    }
}
