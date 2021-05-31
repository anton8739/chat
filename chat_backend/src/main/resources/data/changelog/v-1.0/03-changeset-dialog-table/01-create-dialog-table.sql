CREATE TABLE dialog (
  id   serial PRIMARY KEY,
  status varchar(50),
  last_active_user_id int
)
GO

