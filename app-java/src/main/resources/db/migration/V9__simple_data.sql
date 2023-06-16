TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE accessory_type CASCADE;
TRUNCATE TABLE aquarium CASCADE;
TRUNCATE TABLE aquarium_accessory CASCADE;
TRUNCATE TABLE aquarium_decorator CASCADE;
TRUNCATE TABLE aquarium_template CASCADE;
TRUNCATE TABLE aquarium_template_accessory CASCADE;
TRUNCATE TABLE decorator_type CASCADE;
TRUNCATE TABLE fish_type CASCADE;
TRUNCATE TABLE fish CASCADE;
TRUNCATE TABLE fish_hostile CASCADE;
TRUNCATE TABLE knowledge CASCADE;
TRUNCATE TABLE parameters_history CASCADE;

INSERT INTO public."user" (id, email, "password", first_name, last_name, age, "role")
VALUES (1, 'admin@admin', '$2a$10$buWo9I93aPL1qP.qo6zxv./LGkcRwocgZkhtjorNV/kFQ8DW6Vpti', 'admin', 'admin', 0, 'ROLE_ADMIN'),
       (2, 'user@user', '$2a$10$v8dcIAO7xYQKhFIzT4t/FuDugs6phIY5UnauxZ/z28hW601ChOOO6', 'user', 'user', 0, 'ROLE_USER');
ALTER SEQUENCE user_id_seq RESTART WITH 3;

INSERT INTO accessory_type (id, name, volume)
VALUES (1, 'Grzałka 1', 100.0),
       (2, 'Grzałka 2', 1000.0),
       (3, 'Grzałka 3', 5000.0),
       (4, 'Grzałka 4', 100000.0);
ALTER SEQUENCE accessory_type_id_seq RESTART WITH 5;

INSERT INTO decorator_type (id, name, "type")
VALUES (1, 'Ziemia', 'SUBSTRATE'),
       (2, 'Piasek', 'SUBSTRATE'),
       (3, 'Trawa', 'PLANT'),
       (4, 'Krzak', 'PLANT'),
       (5, 'Kamyk', 'DECORATION'),
       (6, 'Skała', 'DECORATION');
ALTER SEQUENCE decorator_type_id_seq RESTART WITH 7;

INSERT INTO aquarium (id, name, length, width, height, user_id)
VALUES (1, 'Moje 1', 10.0, 10.0, 10.0, 2),
       (2, 'Moje 2', 20.0, 20.0, 20.0, 2);
ALTER SEQUENCE aquarium_id_seq RESTART WITH 3;

INSERT INTO aquarium_accessory (id, aquarium_id, accessory_id)
VALUES (1, 1, 1),
       (2, 2, 2);
ALTER SEQUENCE aquarium_accessory_id_seq RESTART WITH 3;

INSERT INTO aquarium_decorator (id, aquarium_id, decorator_id)
VALUES (1, 1, 1),
       (2, 2, 2);
ALTER SEQUENCE aquarium_decorator_id_seq RESTART WITH 3;

ALTER TABLE aquarium_template
    DROP COLUMN IF EXISTS accessories;
INSERT INTO aquarium_template (id, name, length, width, height)
VALUES (1, 'Małe', 10.0, 10.0, 10.0),
       (2, 'Średnie', 20.0, 20.0, 20.0),
       (3, 'Duże', 50.0, 50.0, 50.0),
       (4, 'Ogromne', 50.0, 100.0, 100.0);
ALTER SEQUENCE aquarium_template_id_seq RESTART WITH 5;

INSERT INTO aquarium_template_accessory (id, aquarium_template_id, accessory_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 4);
ALTER SEQUENCE aquarium_template_accessory_id_seq RESTART WITH 5;

INSERT INTO fish_type (id, max_no2, min_no2, max_no3, min_no3, max_gh, min_gh, max_kh, min_kh, max_ph, min_ph, name)
VALUES (1, 100.0, 10.0, 100.0, 10.0, 100.0, 10.0, 100.0, 10.0, 0.0, 0.0, 'Glonojad'),
       (2, 200.0, 20.0, 200.0, 20.0, 200.0, 20.0, 200.0, 20.0, 0.0, 0.0, 'Złota rybka'),
       (3, 20.0, 2.0, 20.0, 2.0, 20.0, 2.0, 20.0, 2.0, 0.0, 0.0, 'Krewetka');
ALTER SEQUENCE fish_type_id_seq RESTART WITH 4;

INSERT INTO fish_hostile (fish_type_id, hostile_fish_id)
VALUES (3, 2);

INSERT INTO fish (id, birth_day, health_status, aquarium_id, fish_type_id)
VALUES (1, '2023-01-01 01:00:10', 'HEALTHY', 1, 1),
       (2, '2023-01-01 01:16:51', 'SICK', 2, 2);
ALTER SEQUENCE fish_id_seq RESTART WITH 3;

INSERT INTO knowledge (id, problem_type, info, min, max)
VALUES (1, 'GH', 'Mały parametr GH', 0.0, 10.0),
       (2, 'GH', 'Duży parametr GH', 100.0, 1000.0),
       (3, 'PH', 'Duży parametr PH', 10.0, 100.0),
       (4, 'PH', 'Mały parametr PH', 0.0, 1.0),
       (5, 'WATER', 'Mało wody', 0.0, 10.0);
ALTER SEQUENCE knowledge_id_seq RESTART WITH 6;

INSERT INTO parameters_history (id, "timestamp", no2, no3, gh, kh, ph, aquarium_id)
VALUES (1, '2023-01-01 01:01:40', 0.0, 0.0, 0.0, 0.0, 0.0, 1),
       (2, '2023-01-01 01:01:40.001', 10.0, 10.0, 10.0, 10.0, 10.0, 1),
       (3, '2023-01-01 01:01:40.001', 10.0, 10.0, 10.0, 10.0, 10.0, 2),
       (4, '2023-01-01 01:03:20.001', 10.0, 10.0, 10.0, 10.0, 10.0, 2);
ALTER SEQUENCE parameters_history_id_seq RESTART WITH 5;
