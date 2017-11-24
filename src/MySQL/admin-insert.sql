INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin)
  VALUE ('A001','initial-election','11/01/2017','12/05/2017',1000,1,'111111');
INSERT INTO votingsystem.questions (id, name, electionId, optionType)
  VALUES ('001','Question 1','A001',0),
  ('002','Question 2','A001',1);

INSERT INTO votingsystem.options (id, questionId, label, count)
  VALUES ('0001','001','option A',0),
  ('0002','001','option B',0),
  ('0003','001','option C',0),
  ('0004','002','option A',0),
  ('0005','002','option B',0);
