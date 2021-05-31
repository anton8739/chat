CREATE TABLE messages
(
    id        serial PRIMARY KEY,
    user_id   int NOT NULL,
    dialog_id int not null,
    message   varchar(300),
    time      timestamp with time zone,
    status    varchar(50)
)
GO

