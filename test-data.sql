INSERT INTO users (
    name,password,handicap_index) VALUES ('TIM','TIM',9.5);

INSERT INTO courses (
    name,phone,ow,city,region,date_verified) VALUES ('White Horse Golf Course','(360)297-4468','www.whitehorsegolf.com','Kingston','WA','2008/01/01');

INSERT INTO courses (
    name,phone,ow,city,region,date_verified) VALUES ('West Seattle Golf Course','(xxx)xxx-xxxx','www.westseattlegolf.com','Seattle','WA','2008/02/01');
INSERT INTO courses (
    name,phone,ow,city,region,date_verified) VALUES ('Gold Mountain - Olympic Course','(360)415-5432','www.goldmountaingolf.com','Bremerton','WA','2008/02/01');
INSERT INTO courses (
    name,phone,ow,city,region,date_verified) VALUES ('Gold Mountain - Cascade Course','(360)415-5432','www.goldmountaingolf.com','Bremerton','WA','2008/02/01');

INSERT INTO tees (
    course_id, color, slope,rating) Values (1,'Green', 74.7, 141);
INSERT INTO tees (
    course_id, color, slope,rating) Values (1,'Black', 73.4, 141);
INSERT INTO tees (
    course_id, color, slope,rating) Values (1,'Blue', 70.8, 132);
INSERT INTO tees (
    course_id, color, slope,rating) Values (1,'White/Blue', 69.4, 131);
INSERT INTO tees (
    course_id, color, slope,rating) Values (1,'Green', 67.9, 126);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'Black', 71.5, 125);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'Blue', 69.4, 123);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'White', 67.9, 121);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'Green', 65.9, 110);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'Purple', 64.2, 100);
INSERT INTO tees (
    course_id, color, slope,rating) Values (2,'Gold', 62.5, 97);
INSERT INTO tees (
    course_id, color, slope,rating) Values (3,'Gold (Pro)', 74.8, 139);
INSERT INTO tees (
    course_id, color, slope,rating) Values (3,'Blue (Tourney)', 71.9, 134);
INSERT INTO tees (
    course_id, color, slope,rating) Values (3,'White (Player)', 70.0, 126);
INSERT INTO tees (
    course_id, color, slope,rating) Values (3,'Pink (Scoring)', 68.3, 121);
INSERT INTO tees (
    course_id, color, slope,rating) Values (3,'Red (Forward)', 66.2, 117);
INSERT INTO tees (
    course_id, color, slope,rating) Values (4,'Gold (Pro)', 73.0, 125);
INSERT INTO tees (
    course_id, color, slope,rating) Values (4,'Blue (Tourney)', 71.2, 122);
INSERT INTO tees (
    course_id, color, slope,rating) Values (4,'White (Player)', 69.4, 119);
INSERT INTO tees (
    course_id, color, slope,rating) Values (4,'Pink (Scoring)', 67.5, 117);
INSERT INTO tees (
    course_id, color, slope,rating) Values (4,'Red (Forward)', 65.4, 112);
    3 |       1 |      3 |    96 | 21.572727272727274 | 2020-03-18
INSERT INTO Rounds (User_id, Tee_ID, Score, differential, Date_Played) Values (1,3,96,21.57272,'2020/03/18');