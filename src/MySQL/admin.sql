DROP TABLE IF EXISTS `votingsystem`.`options`;
DROP TABLE IF EXISTS `votingsystem`.`questions`;
DROP TABLE IF EXISTS `votingsystem`.`elections`;
CREATE TABLE votingsystem.elections (
  id          VARCHAR(10)  NOT NULL PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  startDate   VARCHAR(10)  NOT NULL,
  endDate     VARCHAR(10)  NOT NULL,
  count       INT  NOT NULL,
  status      VARCHAR(10)  NOT NULL,
  admin       VARCHAR(20)  NOT NULL,
  counter     VARCHAR(20),
  inspector   VARCHAR(20),
  FOREIGN KEY (admin) REFERENCES users(username),
  FOREIGN KEY (counter) REFERENCES users(username),
  FOREIGN KEY (inspector) REFERENCES users(username)
);

CREATE TABLE votingsystem.questions (
  id          VARCHAR(10)  NOT NULL PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  electionID  VARCHAR(10)  NOT NULL,
  optionType  INT  NOT NULL,
  FOREIGN KEY (electionID) REFERENCES elections(id)
);

CREATE TABLE votingsystem.options (
  id          VARCHAR(20)  NOT NULL PRIMARY KEY,
  questionID  VARCHAR(10)  NOT NULL,
  label       VARCHAR(255)  NOT NULL,
  count       INT  NOT NULL,
  FOREIGN KEY (questionID) REFERENCES questions(id)
);

ALTER TABLE `votingsystem`.`questions` 
DROP FOREIGN KEY `questions_ibfk_1`;
ALTER TABLE `votingsystem`.`questions` 
ADD CONSTRAINT `questions_ibfk_1`
  FOREIGN KEY (`electionID`)
  REFERENCES `votingsystem`.`elections` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `votingsystem`.`options` 
DROP FOREIGN KEY `options_ibfk_1`;
ALTER TABLE `votingsystem`.`options` 
ADD CONSTRAINT `options_ibfk_1`
  FOREIGN KEY (`questionID`)
  REFERENCES `votingsystem`.`questions` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;