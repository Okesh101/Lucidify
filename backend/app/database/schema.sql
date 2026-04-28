CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS business_entities (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT REFERENCES users(id),
    business_name TEXT NOT NULL,
    rc_bn_number TEXT UNIQUE NOT NULL,
    entity_type TEXT NOT NULL, -- 'business_name' or 'ltd_company'
    next_filing_deadline DATE NOT NULL,
    last_reminder_sent_days INTEGER DEFAULT 0, -- To avoid double emails
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
