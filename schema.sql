DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;

Create Table users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(15),
    ow VARCHAR(255),
    date_verified TIMESTAMP

);

