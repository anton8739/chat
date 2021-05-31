package by.yurovski.chat_backend.controller;

import by.yurovski.chat_backend.dto.AuthRequestDto;
import by.yurovski.chat_backend.dto.DialogDto;
import by.yurovski.chat_backend.dto.UserDto;
import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.User;
import by.yurovski.chat_backend.enums.MessageStatusEnum;
import by.yurovski.chat_backend.service.DialogService;
import by.yurovski.chat_backend.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/app")
public class DialogController {

    @Autowired
    UserService userService;
    @Autowired
    DialogService dialogService;

    @GetMapping("/dialog/getPartnerByDialogId/{dialogId}/{currentUserId}")
    public UserDto getPartner(@PathVariable("dialogId") int dialogId,
                              @PathVariable("currentUserId") int currentUserId
    ) {
        User partner = userService
                .getDialogPartner(userService.getUser(currentUserId), new Dialog(dialogId));
        return new UserDto(partner);
    }

    @GetMapping("/dialog/markDialogAsDeliverd/{dialogId}/{currentUserId}")
    public void markDialog(@PathVariable("dialogId") int dialogId, @PathVariable("currentUserId") int currentUserId) {
        Dialog dialog = dialogService.getDialogById(dialogId);
        System.out.println(currentUserId+"!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (dialog.getLast_active_user_id() != currentUserId){
            dialog.setStatus(MessageStatusEnum.DELIVERED);
        }

        dialogService.save(dialog);
    }

    @Data
    static class NewDialog {
        private int userId;
        private  int partnerId;
    }

    @PostMapping("/dialog/create")
    public void login(@RequestBody NewDialog newDialog) {
        System.out.println(newDialog.getUserId() +" "+ newDialog.getPartnerId());
        List<Dialog> user1Dialogs = userService.getUserDialogsByUserId(newDialog.getUserId());
        List<Dialog> user2Dialogs = userService.getUserDialogsByUserId(newDialog.getPartnerId());
        if (Collections.disjoint(user1Dialogs, user2Dialogs)){
            Dialog dialog = dialogService.save(new Dialog());
            User user1 =userService.getUser(newDialog.getUserId());
            user1Dialogs.add(dialog);
            user1.setDialogs(user1Dialogs);
            userService.saveUser(user1);
            User user2 =userService.getUser(newDialog.getPartnerId());
            user2Dialogs.add(dialog);
            user2.setDialogs(user2Dialogs);
            userService.saveUser(user2);
        }
    }
}
