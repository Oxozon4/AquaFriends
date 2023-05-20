CREATE TABLE "user"
(
    id         BIGSERIAL PRIMARY KEY,
    email      VARCHAR(256) NOT NULL UNIQUE,
    password   VARCHAR(256) NOT NULL,
    first_name VARCHAR(40)  NOT NULL,
    last_name  VARCHAR(40)  NOT NULL,
    age        INT          NOT NULL
);

CREATE TABLE aquarium
(
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(256) NOT NULL,
    length  FLOAT        NOT NULL,
    width   FLOAT        NOT NULL,
    height  FLOAT        NOT NULL,
    no2     FLOAT        NOT NULL,
    no3     FLOAT        NOT NULL,
    gh      FLOAT        NOT NULL,
    kh      FLOAT        NOT NULL,
    ph      FLOAT        NOT NULL,
    user_id BIGINT       NOT NULL,
    CONSTRAINT aquarium_user_id_fk FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE accessory_type
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE aquarium_accessory
(
    id           BIGSERIAL PRIMARY KEY,
    aquarium_id  BIGINT NOT NULL,
    accessory_id BIGINT NOT NULL,
    CONSTRAINT aquarium_accessory_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT aquarium_accessory_accessory_id_fk FOREIGN KEY (accessory_id) REFERENCES accessory_type (id) ON DELETE CASCADE
);


CREATE TABLE fish_type
(
    id      BIGSERIAL PRIMARY KEY,
    max_no2 FLOAT        NOT NULL,
    min_no2 FLOAT        NOT NULL,
    max_no3 FLOAT        NOT NULL,
    min_no3 FLOAT        NOT NULL,
    max_gh  FLOAT        NOT NULL,
    min_gh  FLOAT        NOT NULL,
    max_kh  FLOAT        NOT NULL,
    min_kh  FLOAT        NOT NULL,
    max_ph  FLOAT        NOT NULL,
    min_ph  FLOAT        NOT NULL,
    name    VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE fish_type_relation
(
    id       BIGSERIAL PRIMARY KEY,
    relation VARCHAR(16) NOT NULL, -- friend, enemy, if no entry means neutral
    fish1_id BIGINT      NOT NULL,
    fish2_id BIGINT      NOT NULL,
    CONSTRAINT fish_type_relation_fish1_id_fk FOREIGN KEY (fish1_id) REFERENCES fish_type (id) ON DELETE CASCADE,
    CONSTRAINT fish_type_relation_fish2_id_fk FOREIGN KEY (fish2_id) REFERENCES fish_type (id) ON DELETE CASCADE,
    CONSTRAINT fish_type_relation_fish_uq UNIQUE (fish1_id, fish2_id),
    CONSTRAINT fish_type_relation_fish_ck CHECK ( fish1_id != fish2_id)

);

CREATE TABLE fish
(
    id            BIGSERIAL PRIMARY KEY,
    birth_day     TIMESTAMP   NOT NULL,
    health_status VARCHAR(64) NOT NULL,
    aquarium_id   BIGINT      NOT NULL,
    fish_id       BIGINT      NOT NULL,
    CONSTRAINT fish_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT fish_fish_id_fk FOREIGN KEY (fish_id) REFERENCES fish_type (id) ON DELETE CASCADE
);

CREATE TABLE decorator_type
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL UNIQUE,
    type VARCHAR(16)  NOT NULL --substrate, plant, decoration
);

CREATE TABLE aquarium_decorator
(
    id           BIGSERIAL PRIMARY KEY,
    aquarium_id  BIGINT NOT NULL,
    decorator_id BIGINT NOT NULL,
    CONSTRAINT aquarium_decorator_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT aquarium_decorator_decorator_id_fk FOREIGN KEY (decorator_id) REFERENCES decorator_type (id) ON DELETE CASCADE
);

CREATE TABLE aquarium_template
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(256) NOT NULL UNIQUE,
    length      FLOAT        NOT NULL,
    width       FLOAT        NOT NULL,
    height      FLOAT        NOT NULL,
    accessories BIGINT[]
);


CREATE TABLE friend
(
    id       BIGSERIAL PRIMARY KEY,
    user1_id BIGINT NOT NULL,
    user2_id BIGINT NOT NULL,
    CONSTRAINT friend_user1_id_fk FOREIGN KEY (user1_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CONSTRAINT friend_user2_id_fk FOREIGN KEY (user2_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CONSTRAINT friend_user_uq UNIQUE (user1_id, user2_id),
    CONSTRAINT friend_user_ck CHECK ( user1_id != user2_id)
);

CREATE TABLE message
(
    id        BIGSERIAL PRIMARY KEY,
    message   VARCHAR   NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    author_id BIGINT    NOT NULL,
    friend_id BIGINT    NOT NULL,
    CONSTRAINT message_author_id_fk FOREIGN KEY (author_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CONSTRAINT message_friend_id_fk FOREIGN KEY (friend_id) REFERENCES friend (id) ON DELETE CASCADE
);

CREATE TABLE knowledge
(
    id           BIGSERIAL PRIMARY KEY,
    problem_type VARCHAR(64) NOT NULL, -- low_no2, low_no3
    info         VARCHAR(64) NOT NULL
);

CREATE TABLE parameters_history
(
    id          BIGSERIAL PRIMARY KEY,
    timestamp   TIMESTAMP NOT NULL,
    no2         FLOAT     NOT NULL,
    no3         FLOAT     NOT NULL,
    gh          FLOAT     NOT NULL,
    kh          FLOAT     NOT NULL,
    ph          FLOAT     NOT NULL,
    aquarium_id BIGINT    NOT NULL,
    CONSTRAINT parameters_history_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE
);


CREATE TABLE accessory_history
(
    id           BIGSERIAL PRIMARY KEY,
    timestamp    TIMESTAMP   NOT NULL,
    event_type   VARCHAR(16) NOT NULL,
    accessory_id BIGINT      NOT NULL,
    aquarium_id  BIGINT      NOT NULL,
    CONSTRAINT accessory_history_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT accessory_history_accessory_id_fk FOREIGN KEY (accessory_id) REFERENCES accessory_type (id) ON DELETE CASCADE
);

CREATE TABLE fish_history
(
    id            BIGSERIAL PRIMARY KEY,
    timestamp     TIMESTAMP   NOT NULL,
    health_status VARCHAR(64) NOT NULL,
    event_type    VARCHAR(16) NOT NULL,
    aquarium_id   BIGINT      NOT NULL,
    fish_id       BIGINT      NOT NULL,
    CONSTRAINT fish_history_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT fish_history_fish_id_fk FOREIGN KEY (fish_id) REFERENCES fish_type (id) ON DELETE CASCADE
);

CREATE TABLE decorator_history
(
    id           BIGSERIAL PRIMARY KEY,
    timestamp    TIMESTAMP   NOT NULL,
    event_type   VARCHAR(16) NOT NULL,
    aquarium_id  BIGINT      NOT NULL,
    decorator_id BIGINT      NOT NULL,
    CONSTRAINT decorator_history_aquarium_id_fk FOREIGN KEY (aquarium_id) REFERENCES aquarium (id) ON DELETE CASCADE,
    CONSTRAINT decorator_history_decorator_id_fk FOREIGN KEY (decorator_id) REFERENCES decorator_type (id) ON DELETE CASCADE
);
