package by.yurovski.chat_backend.service;

import by.yurovski.chat_backend.entity.Dialog;
import by.yurovski.chat_backend.entity.Message;
import by.yurovski.chat_backend.repository.DialogRepo;
import by.yurovski.chat_backend.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DialogService {
    @Autowired
    DialogRepo dialogRepo;
    @Transactional
    public Dialog getDialogById (int id) {

        return dialogRepo.findById(id);
    }
    @Transactional
    public Dialog save (Dialog dialog) {

        return dialogRepo.save(dialog);
    }
}
