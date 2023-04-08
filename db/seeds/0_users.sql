-- Create and seed fake data into user

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (username, email, password, admin)
VALUES ('Alice', 'aliceinwonderland@xmail.com', 'password', FALSE);
INSERT INTO users (username, email, password, admin)
VALUES ('Gandalf', 'thewizard@middleearth.net', 'password', TRUE);
INSERT INTO users (username, email, password, admin)
VALUES ('Draco_Malfoy', 'potterstinks@mhogwarts.edu', 'password', FALSE);
INSERT INTO users (username, email, password, admin)
VALUES ('Murphy', 'lordofdreams@endless.com', 'password', TRUE);
INSERT INTO users (username, email, password, admin)
VALUES ('Laenor_V', 'sooooogay@driftmark.wt', 'password', FALSE);
