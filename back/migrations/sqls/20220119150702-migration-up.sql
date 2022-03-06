CREATE extension
if not exists pgcrypto;

CREATE TABLE usr (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE oauth (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    duration TEXT NOT NULL,
    generated_at TEXT NOT NULL,
    service TEXT NOT NULL,
    usr_id uuid NOT NULL,
    CONSTRAINT fk_usr FOREIGN KEY(usr_id) REFERENCES usr(id)
);

CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    has_oauth BOOL NOT NULL,
    query_code TEXT NOT NULL,
    query_token TEXT NOT NULL,
    logo TEXT NOT NULL,
    client_id TEXT NOT NULL,
    client_secret TEXT NOT NULL,
    redirect_uri TEXT NOT NULL,
    scope TEXT NOT NULL
);

CREATE TABLE adictionnary (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    params TEXT NOT NULL,
    help TEXT NOT NULL,
    service_id INT NOT NULL,
    CONSTRAINT fk_service FOREIGN KEY(service_id) REFERENCES service(id)
);

CREATE TABLE readictionnary (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    params TEXT NOT NULL,
    help TEXT NOT NULL,
    service_id INT NOT NULL,
    CONSTRAINT fk_service FOREIGN KEY(service_id) REFERENCES service(id)
);

CREATE TABLE action (
    id SERIAL PRIMARY KEY,
    params TEXT NOT NULL,
    dico_id INT NOT NULL,
    CONSTRAINT fk_dico FOREIGN KEY(dico_id) REFERENCES adictionnary(id)
);

CREATE TABLE reaction (
    id SERIAL PRIMARY KEY,
    params TEXT NOT NULL,
    reaction_route TEXT NOT NULL,
    dico_id INT NOT NULL,
    CONSTRAINT fk_dico FOREIGN KEY(dico_id) REFERENCES readictionnary(id)
);

CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    id_act INT NOT NULL,
    CONSTRAINT fk_action FOREIGN KEY(id_act) REFERENCES action(id),
    id_react INT NOT NULL,
    CONSTRAINT fk_reaction FOREIGN KEY(id_react) REFERENCES reaction(id),
    usr_id uuid NOT NULL,
    CONSTRAINT fk_usr FOREIGN KEY(usr_id) REFERENCES usr(id)
);

-- SERVICES
INSERT INTO "service" ("name", "has_oauth", "query_code", "query_token", "logo", "client_id", "client_secret", "redirect_uri", "scope")
VALUES ('Gitlab', '1', 'https://gitlab.com/oauth/authorize', 'https://gitlab.com/oauth/token', '/gitlab.png', 'ab602b60dacc5088c4f7ad1426935d458698aece545e352ecb67670f1116d608', '0e54a1fde0860c79a63cfc2f5bf659278bec2f56ed4cc6cc1a9bfa81be2c5009', 'http://localhost:8081', ''), -- ID:1 Gitlab
    ('Mailjet', '0', '', '', '/mail.png', '', '', '', ''), -- ID:2 Mail
    ('Github', '1', 'https://github.com/login/oauth/authorize', 'https://github.com/login/oauth/access_token', '/github.png', '07ffe0c7a5f5148909e2', '4d758dd8b4e8fcfe9aaf30e353ebc87ad9a069ce', 'http://localhost:8081', ''), -- ID:3 Github
    ('Discord', '0', '', '', '/discord.png', '', '', '', ''), -- ID:4 Discord
    ('Sms', '0', '', '', '/sms.png', '', '', '', ''), -- ID: 5 Sms
    ('Weather', '0', '', '', '/weather.png', '', '', '', ''); -- ID: 6 Weather

-- ACTIONS DICO
INSERT INTO "adictionnary" ("name", "description", "params", "help", "service_id")
VALUES ('Any new repository event', 'This trigger reaction every time a new event occurs in a repository.', '[{"string":"url"},{"string":"secret"}]', 'In your github repository webhook, you have to set Payload URL to pantharea.fun:8081/webhooks/Github and to have a Secret code to enter in the parameters above', '3'),
('Push event', 'This trigger reaction when a push occurs in your repository', '[{"number":"project_id"}]', '', '1'),
('Merge request event', 'This trigger reaction when a merge request occurs in your repository', '[{"number":"project_id"}]', '', '1'),
('Issues event', 'This trigger reaction when a Issue occurs in your repository', '[{"number":"project_id"}]', '', '1'),
('Deployment event', 'This trigger reaction when a Deployment occurs in your repository', '[{"number":"project_id"}]', '', '1'),
('Confidential issues event', 'This trigger reaction when a confidential issue occurs in your repository', '[{"number":"project_id"}]', '', '1'),
('Change in temperature', 'This trigger a reaction when the temperature in Celsius changes in the defined location', '[{"string":"city"},{"number":"previous_value"},{"service":"weather"}]', '', '6');

-- REACTIONS DICO
INSERT INTO "readictionnary" ("name", "description", "params", "help", "service_id")
VALUES ('Send an email', 'When triggered, send an email to a chosen recipient, a subject and a body', '[{"string":"username"}, {"string":"recipient"},{"string":"subject"}, {"string":"body"}]','' , '2'), -- ID:1
('Send a discord message', 'When triggered, send a discord message in your server using Discord webhooks', '[{"string":"url"}, {"string":"hookusername"},{"string":"message"}]', '', '4'), -- ID:2
('Send a SMS', 'When triggered, send a message to the phone number you set', '[{"string":"number"}, {"string":"message"}]', '','5'); -- ID:3