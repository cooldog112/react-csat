create table user (
  id bigint primary key auto_increment,
  account varchar(100) not null unique,
  password varchar(100),
  testRoomNum integer,
  applicantNum integer,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

create table person(
    id bigint primary key auto_increment,
    user_id bigint not null,
    period integer,
    applicant integer ,
    candidate integer,
    absentee integer,
    created datetime default current_timestamp,
    updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

create table report(
   id bigint primary key auto_increment,
   user_id bigint not null,
   position varchar(255),
   name varchar(255),
   error varchar(255),
   content varchar(1000),
   created datetime default current_timestamp,
   updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

create table total(
   id bigint primary key auto_increment,
   year integer,
   period integer,
   applicant integer,
   candidate integer,
   absentee integer,
   created datetime default current_timestamp,
   updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

-- person 테이블에 별도시험실 인원을 위한 컬럼 추가
ALTER TABLE person ADD other integer;