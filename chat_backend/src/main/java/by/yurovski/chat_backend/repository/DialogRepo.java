package by.yurovski.chat_backend.repository;

import by.yurovski.chat_backend.entity.Dialog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DialogRepo extends JpaRepository<Dialog,Long> {

    Dialog findById(int id);

    @Override
    <S extends Dialog> S save(S s);
}
