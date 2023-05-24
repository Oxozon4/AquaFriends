DROP TABLE fish_type_relation;

CREATE TABLE fish_hostile
(
    fish_type_id    BIGINT NOT NULL,
    hostile_fish_id BIGINT NOT NULL,
    CONSTRAINT fish_hostile_fish_type_id_fk FOREIGN KEY (fish_type_id) REFERENCES fish_type (id) ON DELETE CASCADE,
    CONSTRAINT fish_hostile_hostile_fish_id_fk FOREIGN KEY (hostile_fish_id) REFERENCES fish_type (id) ON DELETE CASCADE,
    CONSTRAINT fish_hostile_fish_uq UNIQUE (fish_type_id, hostile_fish_id),
    CONSTRAINT fish_hostile_fish_ck CHECK ( fish_type_id != hostile_fish_id)
);
