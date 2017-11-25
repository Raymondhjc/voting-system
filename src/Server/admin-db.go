package main

import (
	"fmt"

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
