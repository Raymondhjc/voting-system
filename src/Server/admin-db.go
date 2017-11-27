package main

import (
	"fmt"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

func (db *MyDB) getElectionList(admin string) ([]Election, error) {
	// Declaration
	var electionList []Election

	// prepare SQL statement.
	var s = fmt.Sprintf(`
		SELECT id, name, startDate, endDate, count, status, admin, counter, inspector
		FROM votingsystem.elections WHERE admin = %s`, admin)

	rows, err := db.Query(s)
	for i := 0; rows.Next(); i++ {
		var ele Election
		err = rows.Scan(
			&ele.ElectionID,
			&ele.ElectionName,
			&ele.StartDate,
			&ele.EndDate,
			&ele.Count,
			&ele.Status,
			&ele.Admin,
			&ele.Scanner,
			&ele.Inspector,
		)
		ele.Questions, err = db.getQuestions(ele.ElectionID)
		electionList = append(electionList, ele)
		// Error handling
		if err != nil {
			return electionList, err
		}

	}

	// If no error, return user info.
	return electionList, nil
}

func (db *MyDB) getQuestions(electionID string) ([]Question, error) {
	// Declaration
	var questionList []Question

	// prepare SQL statement.
	var s = fmt.Sprintf(`
			SELECT id, name, optionType
			FROM votingsystem.questions WHERE electionID = "%s"`, electionID)

	rows, err := db.Query(s)
	for i := 0; rows.Next(); i++ {
		var q Question
		err = rows.Scan(
			&q.QuestionID,
			&q.QuestionName,
			&q.ChoiceType,
		)
		q.Options, err = db.getOptions(q.QuestionID)
		questionList = append(questionList, q)
		// Error handling
		if err != nil {
			return questionList, err
		}
	}

	// If no error, return user info.
	return questionList, nil
}

func (db *MyDB) getOptions(questionID string) ([]Option, error) {
	// Declaration
	var optionList []Option

	// prepare SQL statement.
	var s = fmt.Sprintf(`
			SELECT id, label, count
			FROM votingsystem.options WHERE questionID = "%s"`, questionID)

	rows, err := db.Query(s)
	for i := 0; rows.Next(); i++ {
		var o Option
		err = rows.Scan(
			&o.OptionID,
			&o.Label,
			&o.Count,
		)
		optionList = append(optionList, o)
		// Error handling
		if err != nil {
			return optionList, err
		}
	}

	// If no error, return user info.
	return optionList, nil
}

func (db *MyDB) insertElection(ele NewElection) error {
	var endEleID, endQuID, endOpID string
	rows, err := db.Query("SELECT MAX(id) AS endEleID FROM votingsystem.elections")
	rows.Next()
	err = rows.Scan(&endEleID)
	eid, err := strconv.Atoi(endEleID)
	rows, err = db.Query("SELECT MAX(id) AS endQuID FROM votingsystem.questions")
	rows.Next()
	err = rows.Scan(&endQuID)
	qid, err := strconv.Atoi(endQuID)
	rows, err = db.Query("SELECT MAX(id) AS endOpID FROM votingsystem.options")
	rows.Next()
	err = rows.Scan(&endOpID)
	oid, err := strconv.Atoi(endOpID)
	var s = fmt.Sprintf(`INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin) VALUE ('%s','%s','%s','%s','%d','%s','%s');`,
		strconv.Itoa(eid+1), ele.ElectionName, ele.StartDate, ele.EndDate, ele.Count, ele.Status, ele.Admin)

	for i := 0; i < len(ele.Questions); i++ {
		qu := ele.Questions
		qid = qid + 1
		s += fmt.Sprintf(`INSERT INTO votingsystem.questions (id, name, electionID, optionType) VALUE ('%s','%s','%s','%d');`,
			strconv.Itoa(qid), qu[i].QuestionName, strconv.Itoa(eid+1), qu[i].ChoiceType)
		if err != nil {
			return err
		}
		for j := 0; j < len(qu[i].Options); j++ {
			op := qu[i].Options
			oid = oid + 1
			s += fmt.Sprintf(`INSERT INTO votingsystem.options (id, questionID, label, count) VALUE ('%s','%s','%s','%d');`,
				strconv.Itoa(oid), strconv.Itoa(eid+1), op[j].Label, 0)
			if err != nil {
				return err
			}
		}
	}
	fmt.Println(s)
	stmt, err := db.Prepare(s)
	if err != nil {
		return err
	}

	_, err = stmt.Exec()
	if err != nil {
		return err
	}

	return nil
}
