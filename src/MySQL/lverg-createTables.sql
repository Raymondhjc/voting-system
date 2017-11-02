DROP TABLE votingsystem.users;
DROP TABLE votingsystem.userInfo;

CREATE TABLE votingsystem.users (
  username     VARCHAR(20) NOT NULL  PRIMARY KEY,
  passwordHash CHAR(60)    NOT NULL,
  lastSignin   DATETIME    NOT NULL,
  UNIQUE KEY (username)
);

CREATE TABLE votingsystem.userInfo (
  username      VARCHAR(20)  NOT NULL PRIMARY KEY,
  firstname     VARCHAR(20)  NOT NULL,
  lastname      VARCHAR(20)  NOT NULL,
  email         VARCHAR(255) NOT NULL,
  UFID          INT(8),
  administrator BOOL         NOT NULL,
  UNIQUE KEY (username)
);

SHOW TABLES FROM votingsystem;