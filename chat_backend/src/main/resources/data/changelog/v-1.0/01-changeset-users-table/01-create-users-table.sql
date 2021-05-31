CREATE TABLE users (
  user_id   serial PRIMARY KEY,
  login     VARCHAR(50) UNIQUE NOT NULL,
  name      varchar(100)       not null,
  surname   varchar(100)       not null,
  password  VARCHAR(150)        NOT NULL,
  email     VARCHAR(255)       NOT NULL,
  img       varchar(300),
  birthday  varchar(200),
  family    varchar(200),
  education varchar(200),
  role      varchar(50),
  time  timestamp with time zone,
  enabled    boolean
)
GO

