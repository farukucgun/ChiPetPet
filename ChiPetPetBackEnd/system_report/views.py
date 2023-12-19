from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from reportlab.pdfgen import canvas
import json

@csrf_exempt
@require_http_methods(["GET", "POST"])
def index(request):
    return HttpResponse("You're at the system report index.")

"""

schema.sql is as follows:

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(55),
    last_name VARCHAR(55),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    verified VARCHAR(50),
    role VARCHAR(50) 
);

CREATE TABLE animal_shelter (
    user_id INT PRIMARY KEY,
    address VARCHAR(255) DEFAULT '',
    contact VARCHAR(200) DEFAULT '',
    verification_documents BLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE field_expert (
   	user_id INT PRIMARY KEY,
    speciality VARCHAR(100) DEFAULT '',
    verification_documents BLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE admin (
    user_id INT PRIMARY KEY,
    verification_documents BLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);


CREATE TABLE pet (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    shelter_id INT,
    name VARCHAR(50),
    species VARCHAR(50),
    breed VARCHAR(50),
    gender VARCHAR(10),
    age INT,
    health_status VARCHAR(50),
    description TEXT,
    photo BLOB,
    adoption_status VARCHAR(20),
    FOREIGN KEY (shelter_id) REFERENCES animal_shelter(user_id) 
);

CREATE TABLE health_record (
    pet_id INT  ,
    date DATE,
    fertility VARCHAR(20),
    health_report TEXT,
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id) 
);

CREATE TABLE blog_post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date_and_time DATETIME,
    topic VARCHAR(100),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE comment (
    post_id INT,
    comment_id INT,
    user_id INT,
    date_and_time DATETIME,
    content TEXT,
    PRIMARY KEY (post_id, comment_id),
    FOREIGN KEY (post_id) REFERENCES blog_post(post_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id));

CREATE TABLE adopter (
    user_id INT PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE owns (
	pet_id INT,
	adopter_id INT,
	PRIMARY KEY (pet_id),
	FOREIGN KEY (pet_id) REFERENCES pet(pet_id),
	FOREIGN KEY (adopter_id) REFERENCES adopter(user_id) 
);

CREATE TABLE veterinarian (
    user_id INT PRIMARY KEY,
    address VARCHAR(255) DEFAULT '',
    contact VARCHAR(200) DEFAULT '',
    verification_documents BLOB,
	expertise VARCHAR(200) DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE notification (
    user_id INT,
    date_and_time DATETIME,
    topic VARCHAR(255),
    description TEXT,
	PRIMARY KEY (user_id, date_and_time),
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE applies(
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    application_status VARCHAR(255),
    application_text VARCHAR(255),
    adopter_id INT,
    animal_shelter_id INT,
    pet_id INT,
    FOREIGN KEY (adopter_id) REFERENCES adopter(user_id),
    FOREIGN KEY (animal_shelter_id) REFERENCES user(user_id),
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
);

CREATE TABLE appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    date_and_time DATETIME,
    location VARCHAR(255),
    appointment_text VARCHAR(255),
    user_id INT,
    veterinarian_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (veterinarian_id) REFERENCES user(user_id) 
);

CREATE TABLE message (
    date_and_time DATETIME,
    content TEXT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) 
);

CREATE VIEW veterinarian_info AS 
SELECT user_id, first_name, last_name, username, email, verified, role, address, contact, expertise
           FROM user NATURAL JOIN veterinarian;

CREATE VIEW animal_shelter_info AS 
SELECT user_id, first_name, last_name, username, email, verified, role, address, contact
                    FROM user NATURAL JOIN animal_shelter;

/* 


INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
VALUES ('John', 'Doe', 'johndoe', 'john@email.com', 'password', 'yes', 'animal_shelter');

INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
VALUES ('Jane', 'Doe', 'janedoe', 'jane@email.com', 'password', 'yes', 'adopter');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('John', 'Smith', 'johnsmith', 'johnsmith@email.com', 'password', 'yes', 'veterinarian');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('b', 'b', 'b', 'b@b.com', 'pbkdf2_sha256$260000$9FHonBlSAvEYlPS7PvBFHp$Kz4TLHr4Ud6AS4vjk21ze03LaX+7FbUA7aDZCjyLkb0=', 'b', 'user');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('c', 'c', 'c', 'c@c.com', 'pbkdf2_sha256$260000$84kXvMQbYxBbbmd1qhDPIQ$Og+wlbG71N5RgBddkRkBihA/pbe1sy9MGDI3EC9NvWo=', 'c', 'user');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('d', 'd', 'd', 'd@d.com', 'pbkdf2_sha256$260000$SuoMUQI3vxs03bLVrWHJhe$4osJksIDs7TcFZ8RQr8kRxz2j7ESE8kmRsKcgu2l+HM=', 'd', 'user');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('Jane', 'Smith', 'janesmith', 'janesmith@email.com', 'password', 'yes', 'veterinarian');

INSERT INTO message  
VALUES ("1999-09-29", "Hello", 4, 5);

INSERT INTO message  
VALUES ("1999-09-29", "Hello", 5, 4);

INSERT INTO message  
VALUES ("1999-09-29", "Hello", 5, 6);

INSERT INTO message  
VALUES ("1999-09-29", "Hello", 4, 6);

INSERT INTO blog_post (user_id, date_and_time, topic, content) VALUES (
    4, "1999-09-29", "Pamuk biraz uzgun", "bugunlerde pamukta bir problem var");

INSERT INTO blog_post (user_id, date_and_time, topic, content) VALUES (
    5, "1999-09-29", "Boncuk kafayi siyirdi", "bugunlerde boncukta bir problem var");

INSERT INTO blog_post (user_id, date_and_time, topic, content) VALUES (
    6, "1999-09-29", "Duman delirmek uzere", "bugunlerde dumanda bir problem var");

INSERT INTO comment VALUES (
    1,
    1,
    6,
    "1999-09-29",
    "pamuk sacmalama");
INSERT INTO comment VALUES (
    2,
    1,
    4,
    "1999-09-29",
    "boncuk sacmalama");

INSERT INTO comment VALUES (
    3,
    1,
    5,
    "1999-09-29",
    "duman sacmalama");

INSERT INTO animal_shelter (user_id, address, contact, verification_documents)
VALUES (1, '123 Shelter St', '123-456-7890', NULL);

INSERT INTO adopter (user_id) 
VALUES (2);

INSERT INTO veterinarian (user_id, address, contact, verification_documents, expertise)
VALUES (3, '123 Vet St', '123-456-7890', NULL, 'Dogs');

INSERT INTO pet (shelter_id, name, species, breed, gender, age, health_status, description, photo, adoption_status)
VALUES (1, 'Buddy', 'Dog', 'Labrador Retriever', 'Male', 2, 'Good', 'Friendly and playful dog', NULL, 'Available');

INSERT INTO applies (application_status, application_text, adopter_id, animal_shelter_id, pet_id)
VALUES ('PENDING', 'I would like to adopt Buddy.', 2, 1, 1);

INSERT INTO appointment (date_and_time, location, appointment_text, user_id, veterinarian_id)
VALUES ('2020-11-11 11:11:11', '123 Vet St', 'Checkup', 2, 3);

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (2, '2023-01-01 10:00:00', 'Application Status', 'Your adoption application is pending review.');

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (3, '2023-01-02 12:00:00', 'Appointment Scheduled', 'You have a scheduled appointment for a health check.');

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (4, '2023-01-03 14:00:00', 'Application Status', 'You have a new adoption application.');

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (5, '2023-01-04 16:00:00', 'Application Status', 'You have a new adoption application.');

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (6, '2023-01-05 18:00:00', 'Application Status', 'You have a new adoption application.');

INSERT INTO veterinarian (user_id, address, contact, verification_documents, expertise)
VALUES (7, 'Notthingham Forest', '359034-21309', NULL, 'Birds');

Administrators prepare system reports for top vets, the most number of pets adopted by a user, and the most adopted pet breed.

"""
@csrf_exempt
@require_http_methods(["GET"])
def get_system_report(request):
    # Your logic to gather data for the report (e.g., top vets, adoption stats, etc.)
    # Replace the following dummy data with your actual data retrieval logic

    top_vets_data = [("Vet 1", 10), ("Vet 2", 8), ("Vet 3", 6)]
    most_adopted_user_data = ("John Doe", 15)
    most_adopted_breed_data = ("Labrador Retriever", 20)

    # Generate the PDF report
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="system_report.pdf"'

    # Create a PDF document
    pdf_canvas = canvas.Canvas(response)

    # Add content to the PDF (replace with your actual report content)
    pdf_canvas.drawString(100, 800, "System Report")

    # Top Veterinarians
    pdf_canvas.drawString(100, 780, "Top Veterinarians:")
    y_position = 760
    for vet, pets_count in top_vets_data:
        pdf_canvas.drawString(120, y_position, f"{vet}: {pets_count} pets")
        y_position -= 20

    # Most Adopted User
    pdf_canvas.drawString(100, y_position, f"Most Adopted User: {most_adopted_user_data[0]} with {most_adopted_user_data[1]} pets")

    # Most Adopted Pet Breed
    pdf_canvas.drawString(100, y_position - 20, f"Most Adopted Pet Breed: {most_adopted_breed_data[0]} with {most_adopted_breed_data[1]} pets")

    # Save the PDF
    pdf_canvas.save()

    return response


   