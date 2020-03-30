DROP TABLE IF EXISTS ROUNDS;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS Tees;   
DROP TABLE IF EXISTS courses;


Create Table users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    handicap_index NUMERIC

);

CREATE TABLE ROUNDS(
    ID SERIAL PRIMARY KEY,
    USER_ID INTEGER,
    FOREIGN KEY(USER_ID) REFERENCES users(ID),
    TEE_ID INTEGER,
    SCORE INTEGER,
    differential NUMERIC,
    DATE_PLAYED VARCHAR(255)
);


CREATE TABLE Courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(15),
    ow VARCHAR(255),
    city VARCHAR(255),
    region VARCHAR(255),
    date_verified date
);

CREATE TABLE tees (
    id SERIAL Primary Key,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    color varchar(255),
    slope NUMERIC,
    rating INTEGER
);