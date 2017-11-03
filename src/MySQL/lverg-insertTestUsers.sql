DELETE FROM votingsystem.users
WHERE username = "testUsername";
DELETE FROM votingsystem.userInfo
WHERE username = "testUsername";

INSERT INTO votingsystem.users (username, passwordHash, lastSignin)
  VALUE ('testUsername', '$2a$14$N5bV116c7L4kmjZZH3DD6emAVKAML5k.jeEaprzZeUC0H3.nvYdzC', now());


INSERT INTO votingsystem.userInfo (username, firstname, lastname, email, UFID, administrator)
  VALUE ('testUsername', 'testFirstname', 'testLastname', 'test@email.com', 12345678, FALSE);

SELECT *
FROM votingsystem.users;

SELECT *
FROM votingsystem.userInfo;

UPDATE votingsystem.userInfo
SET email = "lvergergsk@outlook.com"
WHERE username = "testUsername";

SELECT
  firstname,
  lastname,
  email,
  ufid
FROM votingsystem.userInfo
WHERE username = 'testUsername'