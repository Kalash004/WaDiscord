create database vanoceweby;
use vanoceweby;

create table users(
	userId int primary key auto_increment,
    `name` varchar(40) unique not null,
    `password` varchar(300) not null 
);

create table chatrooms(
	chatroomId int primary key auto_increment,
    name varchar(10) not null
);

create table messages(
	messageId int primary key auto_increment,
    text varchar(300),
    f_userId int not null,
    f_chatroomId int not null
);

create table join_users_to_chatrooms(
	id int primary key auto_increment,
    f_userId int not null,
	f_chatroomId int not null
);

ALTER TABLE `messages` ADD FOREIGN KEY (`f_userId`) REFERENCES `users` (`userId`);
ALTER TABLE `messages` ADD FOREIGN KEY (`f_chatroomId`) REFERENCES `chatrooms` (`chatroomId`);
ALTER TABLE `join_users_to_chatrooms` ADD FOREIGN KEY (`f_chatroomId`) REFERENCES `chatrooms` (`chatroomId`);
ALTER TABLE `join_users_to_chatrooms` ADD FOREIGN KEY (`f_userId`) REFERENCES `users` (`userId`);

