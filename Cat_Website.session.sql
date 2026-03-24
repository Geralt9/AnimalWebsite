CREATE DATABASE Cats_Api;
USE game_company;
SELECT *FROM game_companies;

USE Cats_Api;
CREATE TABLE cat_data(
    ID INT NOT NULL AUTO_INCREMENT,
    cat_id INT NOT NULL,
    description VARCHAR(255),

    PRIMARY KEY(ID)
);



ALTER TABLE cat_data
ADD COLUMN Image_url VARCHAR(255) NOT NULL;

ALTER TABLE cat_data
MODIFY COLUMN description VARCHAR(15000);

ALTER TABLE cat_data
MODIFY COLUMN cat_id VARCHAR(255) NOT NULL;

SELECT *FROM cat_data;

DELETE FROM cat_data
WHERE ID = 17 ;

ALTER TABLE cat_data
MODIFY COLUMN cat_id VARCHAR(255) NOT NULL UNIQUE;



DELETE FROM cat_data 
WHERE id NOT IN (
    SELECT id FROM (
        SELECT MIN(id) AS id FROM cat_data GROUP BY description, Image_url
    ) AS temp_table
);

-----------------------Users Table-----------------------------

USE cats_api;

CREATE TABLE Users (
    ID INT NOT NULL AUTO_INCREMENT,
    FullName VARCHAR(500) NOT NULL,
    EmailAddress VARCHAR(500) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Fav_Cat VARCHAR(400),
    PRIMARY KEY(ID),
    FOREIGN KEY(Fav_Cat) REFERENCES cat_data(cat_id)
);

SELECT *FROM users;

CREATE TABLE refresh_tokens (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    Token VARCHAR(255) NOT NULL UNIQUE,
    Expiry_time DATETIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(ID)
);

SELECT *FROM refresh_tokens;


CREATE TABLE Profile_details(
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Profile_id INT NOT NULL,
    Background_Img VARCHAR(255),
    Profile_picture VARCHAR(255),
    Bio TEXT,
    Pictures VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Profile_id) REFERENCES users(ID)
);



