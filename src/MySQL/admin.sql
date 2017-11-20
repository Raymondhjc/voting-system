DROP TABLE IF EXISTS `votingsystem`.`elections`;
DROP TABLE IF EXISTS `votingsystem`.`questions`;
DROP TABLE IF EXISTS `votingsystem`.`options`;
CREATE TABLE votingsystem.elections (
  id          VARCHAR(10)  NOT NULL PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  startDate   VARCHAR(10)  NOT NULL,
  endDate     VARCHAR(10)  NOT NULL,
  count       INT  NOT NULL,
  status      INT  NOT NULL,
  admin       VARCHAR(20)  NOT NULL,
  counter     VARCHAR(20),
  inspector   VARCHAR(20),
  FOREIGN KEY (admin) REFERENCES users(username),
  FOREIGN KEY (counter) REFERENCES users(username),
  FOREIGN KEY (inspector) REFERENCES users(username)
);

CREATE TABLE votingsystem.questions (
  id          VARCHAR(20)  NOT NULL PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  electionId  VARCHAR(10)  NOT NULL,
  optionType  INT  NOT NULL,
  FOREIGN KEY (electionId) REFERENCES elections(id)
);

CREATE TABLE votingsystem.options (
  id          VARCHAR(20)  NOT NULL PRIMARY KEY,
  questionId  VARCHAR(10)  NOT NULL,
  label       VARCHAR(255)  NOT NULL,
  FOREIGN KEY (questionId) REFERENCES questions(id)
);