create table user (
  id bigint primary key auto_increment,
  account varchar(100) not null unique,
  password varchar(100),
  testRoomNum integer,
  applicantNum integer,
  stored_path varchar(255),
  original_name varchar(255),
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

insert into user(account, password, testRoomNum, applicantNum)
values('매천고','1234','20','400');