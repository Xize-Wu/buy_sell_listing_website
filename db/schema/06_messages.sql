-- individual messages in the sessions

DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
 id SERIAL PRIMARY KEY NOT NULL,
 session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
 sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 message TEXT,
 created_at TIMESTAMP DEFAULT NOW()
);