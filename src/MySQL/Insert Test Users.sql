INSERT INTO votingsystem.users (username, passwordHash, lastSignin)
  VALUE ('testUsername', '123451234512345123451234512345123451234512345123451234512345', now());

SELECT *
FROM votingsystem.users;

INSERT INTO votingsystem.userInfo (username, firstname, lastname, email, UFID, administrator)
  VALUE ('testUsername', 'testFirstname', 'testLastname', 'test@email.com', 12345678, FALSE);

SELECT *
FROM votingsystem.userInfo;
