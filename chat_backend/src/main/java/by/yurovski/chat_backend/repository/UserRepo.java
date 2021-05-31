package by.yurovski.chat_backend.repository;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRepo extends JpaRepository<User,Long> {
    User findById(int id);
    List<User> findByDialogsContaining(Dialog dialog);
    User findByLogin(String login);
    List<User> findAll ();
    @Override
    <S extends User> S save(S s);
}
