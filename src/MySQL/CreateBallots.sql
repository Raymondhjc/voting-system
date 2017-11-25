DROP TABLE IF EXISTS `ballots`;
CREATE TABLE votingsystem.ballots (
		ballotID INT(8) NOT NULL PRIMARY KEY,
		rateOfRight Int(4) NOT NULL,
		questionID Int(4) NOT NULL,
		optionID VARCHAR(20) NOT NULL,
		optionName VARCHAR(20) NOT NULL,
		UNIQUE KEY (ballotID)
);
INSERT INTO votingsystem.ballots (ballotID, 
	rateOfRight, questionID, optionID, optionName)
	VALUE	(102, 80, 1, 7,'Ronadlo'),
			(102, 80, 2, 1,'Neux'),
			(102, 80, 3, 3,'Thomas'),
			(103, 60, 1, 9,'Benzema'),
			(103, 60, 2, 2,'Helen'),
			(103, 60, 3, 6,'Thomas'),
			(104, 80, 1, 7,'Ronadlo'),
			(104, 80, 2, 1,'Neux'),
			(104, 80, 3, 6,'Thomas'),
			(105, 58, 1, 7,'Ronadlo'),
			(105, 58, 2, 1,'Neux'),
			(105, 58, 3, 5,'Daisy'),
			(106, 50, 1,11,'Bale'),
			(106, 50, 2, 3,'Helen'),
			(106, 50, 3, 6,'Thomas'),
			(107, 60, 1, 7,'Ronadlo'),
			(107, 60, 2, 1,'Neux'),
			(107, 60, 3, 3,'Daisy'),
			(108, 20, 1,11,'Bale'),
			(108, 20, 2, 1,'Neux'),
			(108, 20, 3, 6,'Thomas');