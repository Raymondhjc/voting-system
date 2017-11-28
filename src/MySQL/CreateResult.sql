--actually we need create different results according to different elections
DROP TABLE IF EXISTS `result`;
-- this table is to record the result after counting the ballots

CREATE TABLE votingsystem.result (
		ID  	INT(8)   NOT NULL PRIMARY KEY,
		optionName	VARCHAR(20)  NOT NULL ,
		questionID  INT(8)  NOT NULL,
		electionID INT(8) NOT NULL,
		soundvotes  INT(8)   NOT NULL,
		unsurevotes INT(8)   NOT NULL,
		totalvotes  INT(8)   NOT NULL,
		UNIQUE KEY (ID)

);
--insert to the result table to simulate the voting result 
INSERT INTO votingsystem.result ( ID, optionName, questionID, electionID, soundvotes, unsurevotes, totalvotes)
	VALUE (7, 'Ronaldo', 1, 1, 1254, 234 ,1488),
		  (9, 'Benzema', 1, 1,  789, 221 ,1010),
		  (11, 'Bale',   1, 1, 1254, 233, 1487),
		  (1,  'Neux',   2, 1, 1234, 254, 1488),
		  (2, 'Helen', 	 2, 1, 1287, 124, 1411),
		  (3, 'Serra',   2, 1, 1049, 434, 1483),
		  (4, 'Charles', 3,  1, 1854, 534, 2388),
		  (5, 'Dasiy',   3, 1, 1124, 324, 1448),
		  (6,'Thomas',   3, 1,  954, 454, 1408);