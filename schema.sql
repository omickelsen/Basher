DROP DATABASE IF EXISTS basherDB;
CREATE DATABASE basherDB;
USE basherDB;

CREATE TABLE bashingTable
(
  id INTEGER
  AUTO_INCREMENT NOT NULL,
  userName VARCHAR
  (50),
  userEmail VARCHAR
  (100),
  userComment VARCHAR
  (1065),
  PRIMARY KEY
  (id)
);

  INSERT INTO bashingTable
    (id, userName, userEmail, userComment)
  VALUES
    (1, "Braden Flory", "bradenflory93@gmail.com", "Let's bash!");