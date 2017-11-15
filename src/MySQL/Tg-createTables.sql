#create database votingsystem;

DROP TABLE votingsystem.pictures;

CREATE TABLE votingsystem.pictures (
  pictureId     INT(8) NOT NULL  PRIMARY KEY,
  pictureAddress VARCHAR(100),
  UNIQUE KEY (pictureId)
);

SHOW TABLES FROM votingsystem;