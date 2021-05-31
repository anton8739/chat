package by.yurovski.chat_backend.controller;

import by.yurovski.chat_backend.dto.DialogDto;
import by.yurovski.chat_backend.dto.MessageDto;
import by.yurovski.chat_backend.dto.UserDto;
import by.yurovski.chat_backend.entity.Dialog;

import by.yurovski.chat_backend.entity.Message;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.service.MessageService;
import by.yurovski.chat_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/app")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    MessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/account/{id}")
    public void getMessage(@DestinationVariable int id ) throws Exception {
        String str = "{ 'done' : '"+id +"'}";
        System.out.println(str);
       // messagingTemplate.convertAndSend("/topic/account/" + id,  str);
    }

    @GetMapping("/user/getDialogList/{id}")
    public List<DialogDto> getDialogList(@PathVariable("id") int id) {
        List<Dialog> dialogs = userService.getUserDialogsByUserId(id);
        List<DialogDto> dialogDtos =dialogs.stream().map(dialog -> {
            Message message = messageService.getLastMessageOfDialog(dialog);
            User partner = userService.getDialogPartner(userService.getUser(id),dialog);
            if (message ==null){
                return new DialogDto(dialog, partner,new MessageDto());
            }
            return new DialogDto(dialog, partner, new MessageDto(message));
        }).collect(Collectors.toList());
        return dialogDtos;
    }

    @GetMapping("/user/getUserById/{id}")
    public UserDto getUser(@PathVariable("id") int id) {
        return new UserDto(userService.getUser(id));
    }
    @GetMapping("/user/getUserList")
    public List<UserDto> getUserList() {
        List<User> userList =userService.getUserList();
        List<UserDto> userDtoList= userList.stream().map(user -> new UserDto(user)).collect(Collectors.toList());
        return userDtoList;
    }
    @GetMapping("/user/getUserInfo")
    public UserDto getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalLogin= authentication.getName();

        User user =userService.findUserByLogin(currentPrincipalLogin);
        return new UserDto(user);
    }
    @PostMapping("/user/setLastVisitTime")
    public void SetLastVisitTime(Principal principal) {
        userService.setLastVisitTime(principal.getName(), new Timestamp(System.currentTimeMillis()));
    }
}
