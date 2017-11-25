INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin)
  VALUE ('A001','initial-election','11/01/2017','12/05/2017',1000,1,'111111');
INSERT INTO votingsystem.questions (id, name, electionID, optionType)
  VALUES ('001','Question 1','A001',0),
  ('002','Question 2','A001',1);

INSERT INTO votingsystem.options (id, questionID, label, count)
  VALUES ('0001','001','option A',0),
  ('0002','001','option B',0),
  ('0003','001','option C',0),
  ('0004','002','option A',0),
  ('0005','002','option B',0);

INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin)
  VALUE ('A002','Sample election 2','10/01/2017','11/15/2017',500,0,'111111');
INSERT INTO votingsystem.questions (id, name, electionID, optionType)
  VALUES ('003','Question 1','A002',0),
  ('004','Question 2','A002',1);

INSERT INTO votingsystem.options (id, questionID, label, count)
  VALUES ('0006','003','option A',0),
  ('0007','003','option B',0),
  ('0008','003','option C',0),
  ('0009','004','option A',0),
  ('0010','004','option B',0),
  ('0011','004','option C',0);
