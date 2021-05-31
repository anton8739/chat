package by.yurovski.chat_backend.service;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Transactional
    public User saveUser(User user) {
        return userRepo.save(user);
    }
    @Transactional
    public List<Dialog> getUserDialogsByUserId(int id) {
        User user = userRepo.findById(id);
        return user.getDialogs();
    }

    @Transactional
    public User getUser(int id) {
        return userRepo.findById(id);
    }
    @Transactional
    public List<User> getUserList() {
        return userRepo.findAll();
    }

    @Transactional
    public User findUserByLogin(String login) {
        return userRepo.findByLogin(login);
    }

    @Transactional
    public User getDialogPartner(User user, Dialog dialog) {
        List<User> list = userRepo.findByDialogsContaining(dialog).stream().filter(us -> us.getId() != user.getId()).collect(Collectors.toList());
        return list.get(0);
    }
    @Transactional
    public User setLastVisitTime(String login, Timestamp timestamp) {
        User user = userRepo.findByLogin(login);
        user.setTime(timestamp);
        user=userRepo.save(user);
        return user;
    }
}
