CREATE extension
if not exists pgcrypto;

CREATE TABLE usr (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE oauth (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    duration TEXT NOT NULL,
    generated_at TEXT NOT NULL,
    usr_id uuid NOT NULL,
    CONSTRAINT fk_usr FOREIGN KEY(usr_id) REFERENCES usr(id)
);

CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    has_oauth BOOL NOT NULL,
    auth_id INT,
    CONSTRAINT fk_auth FOREIGN KEY(auth_id) REFERENCES oauth(id)
);

CREATE TABLE dictionnary (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    base_url TEXT NOT NULL,
    service_id INT NOT NULL,
    CONSTRAINT fk_service FOREIGN KEY(service_id) REFERENCES service(id)
);


CREATE TABLE action (
    id SERIAL PRIMARY KEY,
    dico_id INT NOT NULL,
    CONSTRAINT fk_dictionnary FOREIGN KEY(dico_id) REFERENCES dictionnary(id)
);

CREATE TABLE reaction (
    id SERIAL PRIMARY KEY,
    dico_id INT NOT NULL,
    CONSTRAINT fk_dictionnary FOREIGN KEY(dico_id) REFERENCES dictionnary(id)
);
