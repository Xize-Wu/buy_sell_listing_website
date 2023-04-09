-- Create and seed fake data into user

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
