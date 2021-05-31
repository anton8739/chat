package by.yurovski.chat_backend.websocket;

import by.yurovski.chat_backend.security.jwt.JWTProvider;
import by.yurovski.chat_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class WebSocketSessionChannelInterceptor implements ChannelInterceptor {
    @Autowired
    JWTProvider jwtProvider;
    @Autowired
    UserService userService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("Channel Interceptor");
        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println(accessor.getCommand().toString());
        if (accessor.getCommand().toString().equals("CONNECT") ||
                accessor.getCommand().toString().equals("SEND")) {
            MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS, MultiValueMap.class);
            String token = multiValueMap.getFirst("Authorization");
            if (token != null && token.startsWith("Bearer_")) {
                token = token.substring(7, token.length());

            }
            if (token != null && jwtProvider.validateToken(token)) {
                Authentication auth = jwtProvider.getAuthentication(token);
                if (auth != null) {
                    String login=auth.getName();
                    userService.setLastVisitTime(login, new Timestamp(System.currentTimeMillis()));
                }
            }
            System.out.println("+");
        } else if (accessor.getCommand().toString().equals("DISCONNECT")) {
            System.out.println("-");
        } else {
            System.out.println("0");
        }

        return message;
    }
}