SHOW DATABASES;
CREATE DATABASE votingsystem;

CREATE USER 'ufse'@'localhost'
  IDENTIFIED BY 'voting-system';
GRANT ALL PRIVILEGES ON votingsystem.* TO 'ufse'@'localhost';
