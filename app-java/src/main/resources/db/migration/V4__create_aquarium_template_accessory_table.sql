CREATE TABLE aquarium_template_accessory
(
    id                   BIGSERIAL PRIMARY KEY,
    aquarium_template_id BIGINT NOT NULL,
    accessory_id         BIGINT NOT NULL,
    CONSTRAINT aquarium_template_accessory_aquarium_template_id_fk FOREIGN KEY (aquarium_template_id) REFERENCES aquarium_template (id) ON DELETE
        CASCADE,
    CONSTRAINT aquarium_template_accessory_accessory_id_fk FOREIGN KEY (accessory_id) REFERENCES accessory_type (id) ON DELETE CASCADE
);
