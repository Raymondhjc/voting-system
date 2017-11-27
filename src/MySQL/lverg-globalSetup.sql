-- This script will create database called "votingsystem"

-- This script will create user for the application backend,
-- and give necessary previllege.
-- username: ufse
-- password: voting-system
-- previllege: all previllege on votingsystem

SHOW DATABASES;
CREATE DATABASE votingsystem;

CREATE USER 'ufse'@'localhost'
  IDENTIFIED BY 'voting-system';
GRANT ALL PRIVILEGES ON votingsystem.* TO 'ufse'@'localhost';
