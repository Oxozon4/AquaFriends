DELETE
FROM "user"
WHERE email IN ('admin@admin', 'user@user');

INSERT INTO public."user" (email, "password", first_name, last_name, age, "role")
VALUES ('admin@admin', '$2a$10$buWo9I93aPL1qP.qo6zxv./LGkcRwocgZkhtjorNV/kFQ8DW6Vpti', 'admin', 'admin', 0, 'ROLE_ADMIN'),
       ('user@user', '$2a$10$v8dcIAO7xYQKhFIzT4t/FuDugs6phIY5UnauxZ/z28hW601ChOOO6', 'user', 'user', 0, 'ROLE_USER');

