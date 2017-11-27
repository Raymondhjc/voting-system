DELETE FROM votingsystem.elections WHERE id = "1";
DELETE FROM votingsystem.elections WHERE id = "2";
INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin)
  VALUE ('1','initial-election','11/01/2017','12/05/2017',1000,"open",'111111');
INSERT INTO votingsystem.questions (id, name, electionID, optionType)
  VALUES ('1','Question 1','1',0),
  ('2','Question 2','1',1);

INSERT INTO votingsystem.options (id, questionID, label, count)
  VALUES ('1','1','option A',0),
  ('2','1','option B',0),
  ('3','1','option C',0),
  ('4','2','option A',0),
  ('5','2','option B',0);

INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin)
  VALUE ('2','Sample election 2','10/01/2017','11/15/2017',500,"closed",'111111');
INSERT INTO votingsystem.questions (id, name, electionID, optionType)
  VALUES ('3','Question 1','2',0),
  ('4','Question 2','2',1);

INSERT INTO votingsystem.options (id, questionID, label, count)
  VALUES ('6','3','option A',0),
  ('7','3','option B',0),
  ('8','3','option C',0),
  ('9','4','option A',0),
  ('10','4','option B',0),
  ('11','4','option C',0);
