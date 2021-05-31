package by.yurovski.chat_backend.repository;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Long> {
    List<Message> findByDialog(Dialog dialog);


    @Override
    <S extends Message> S save(S s);
}
