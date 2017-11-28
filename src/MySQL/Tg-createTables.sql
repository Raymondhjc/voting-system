#create database votingsystem;

DROP TABLE votingsystem.pictures;

CREATE TABLE votingsystem.pictures (
  pictureId     INT(8) NOT NULL  auto_increment,
  pictureAddress VARCHAR(100),
  primary KEY (pictureId)
);

SHOW TABLES FROM votingsystem;