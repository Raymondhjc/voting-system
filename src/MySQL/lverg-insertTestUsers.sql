-- This script will insert a test account credential and its user information.
-- username: testUsername
-- password: testPassword

DELETE FROM votingsystem.users
WHERE username = "testUsername";
DELETE FROM votingsystem.userInfo
WHERE username = "testUsername";

DELETE FROM votingsystem.users
WHERE username = "testUsername9";
DELETE FROM votingsystem.userInfo
WHERE username = "testUsername9";

INSERT INTO votingsystem.users (username, passwordHash, lastSignin)
  VALUE ('testUsername', '$2a$14$N5bV116c7L4kmjZZH3DD6emAVKAML5k.jeEaprzZeUC0H3.nvYdzC', now());

INSERT INTO votingsystem.userInfo (username, firstname, lastname, email, UFID, administrator)
  VALUE ('testUsername', 'testFirstname', 'testLastname', 'test@email.com', 12345678, FALSE);

INSERT INTO votingsystem.users (username, passwordHash, lastSignin)
  VALUE ('admin', '$2a$14$DKRJnpZGaom4Pt0ug1RVwuf4kV9bvG9/3RJ4F6PswCLDS0nX9AZPi', now());


INSERT INTO votingsystem.userInfo (username, firstname, lastname, email, UFID, administrator)
  VALUE ('admin', 'testFirstname', 'testLastname', 'test@email.com', 12345678, FALSE);

SELECT *
FROM votingsystem.users;

SELECT *
FROM votingsystem.userInfo;

DESC votingsystem.userInfo;