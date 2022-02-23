CREATE extension
if not exists pgcrypto;

CREATE TABLE usr (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE oauth_dictionnary (
    id SERIAL PRIMARY KEY,
    service TEXT NOT NULL,
    query_code TEXT NOT NULL,
    query_token TEXT NOT NULL,
    logo TEXT NOT NULL,
    client_id TEXT NOT NULL,
    client_secret TEXT NOT NULL,
    redirect_uri TEXT NOT NULL,
    scope TEXT NOT NULL

);

CREATE TABLE oauth (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
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

--CREATE TABLE dictionnary (
--    id SERIAL PRIMARY KEY,
--    name TEXT NOT NULL,
--    description TEXT NOT NULL,
--    base_url TEXT NOT NULL,
--    service_id INT NOT NULL,
--    CONSTRAINT fk_service FOREIGN KEY(service_id) REFERENCES service(id)
--);


CREATE TABLE action (
    id SERIAL PRIMARY KEY,
    service_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    params TEXT NOT NULL
    --dico_id INT NOT NULL,
    --CONSTRAINT fk_dictionnary FOREIGN KEY(dico_id) REFERENCES dictionnary(id)
);

CREATE TABLE reaction (
    id SERIAL PRIMARY KEY,
    service_name TEXT NOT NULL,
    reaction_type TEXT NOT NULL,
    params TEXT NOT NULL,
    reaction_route TEXT NOT NULL
    --dico_id INT NOT NULL,
    --CONSTRAINT fk_dictionnary FOREIGN KEY(dico_id) REFERENCES dictionnary(id)
);

CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    r_service TEXT NOT NULL,
    r_type TEXT NOT NULL,
    r_params TEXT NOT NULL,
    id_act INT NOT NULL,
    id_react INT NOT NULL,
    CONSTRAINT fk_action FOREIGN KEY(id_act) REFERENCES action(id),
    CONSTRAINT fk_reaction FOREIGN KEY(id_react) REFERENCES reaction(id)  
);

INSERT INTO oauth_dictionnary (service, query_code, query_token, logo, client_id, client_secret, redirect_uri, scope) values ('github', 'https://github.com/login/oauth/authorize', 'https://github.com/login/oauth/access_token', '', '07ffe0c7a5f5148909e2', '4d758dd8b4e8fcfe9aaf30e353ebc87ad9a069ce', 'http://localhost:8081', '')