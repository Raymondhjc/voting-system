DROP TABLE result;
-- this table is to record the result after counting the ballots
CREATE TABLE votingsystem.result (
		ID  	INT(8)   NOT NULL  ,
		name	VARCHAR(20)  NOT NULL PRIMARY KEY,
		question  INT(8)  NOT NULL,
		soundvotes  INT(8)   NOT NULL,
		unsurevotes INT(8)   NOT NULL,
		totalvotes  INT(8)   NOT NULL,
		UNIQUE KEY (username)

);
--insert to the result table to simulate the voting result 
INSERT INTO votingsystem.result ( ID,name,totalvotes,soundvotes,unsurevotes)
	VALUE (7, 'Ronaldo', 1, 1254, 234 ,1488),
		  (9, 'Benzema', 1, 789, 221 ,1010),
		  (11, 'Bale',   1, 1254, 233, 1487),
		  (1,  'Neux',   2,1234, 254, 1488),
		  (2, 'Helen', 	 2, 1287, 124, 1411),
		  (3, 'Serra',   2, 1049, 434,1483),
		  (4, 'Charles', 3  1854, 534, 2388),
		  (5, 'Dasiy',   3, 1124, 324, 1448),
		  (6,'Thomas',   3 , 954, 454, 1408);