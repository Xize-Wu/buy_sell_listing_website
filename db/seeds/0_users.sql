-- Create and seed fake data into user
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (username, email, password, admin)
VALUES ('Alice', 'aliceinwonderland@xmail.com', 'password1', FALSE);
INSERT INTO users (username, email, password, admin)
VALUES ('Gandalf', 'thewizard@middleearth.net', 'password2', TRUE);
INSERT INTO users (username, email, password, admin)
VALUES ('Draco_Malfoy', 'potterstinks@hogwarts.edu', 'password3', FALSE);
INSERT INTO users (username, email, password, admin)
VALUES ('Murphy', 'lordofdreams@endless.com', 'password4', TRUE);
INSERT INTO users (username, email, password, admin)
VALUES ('Laenor_V', 'sooooogay@driftmark.wt', 'password5', FALSE);
