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

func (db *MyDB) getQuestions(electionID int) ([]Question, error) {
	// Declaration
	var questionList []Question

	// prepare SQL statement.
	var s = fmt.Sprintf(`
			SELECT id, name, optionType
			FROM votingsystem.questions WHERE electionID = "%d"`, electionID)

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

func (db *MyDB) getOptions(questionID int) ([]Option, error) {
	// Declaration
	var optionList []Option

	// prepare SQL statement.
	var s = fmt.Sprintf(`
			SELECT id, label, count
			FROM votingsystem.options WHERE questionID = "%d"`, questionID)

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
	var endEleID, endQuID, endOpID int
	rows, err := db.Query("SELECT MAX(id) AS endEleID FROM votingsystem.elections")
	rows.Next()
	err = rows.Scan(&endEleID)
	rows, err = db.Query("SELECT MAX(id) AS endQuID FROM votingsystem.questions")
	rows.Next()
	err = rows.Scan(&endQuID)
	rows, err = db.Query("SELECT MAX(id) AS endOpID FROM votingsystem.options")
	rows.Next()
	err = rows.Scan(&endOpID)
	var s = fmt.Sprintf(`INSERT INTO votingsystem.elections (id, name, startDate, endDate, count, status, admin) VALUE ('%d','%s','%s','%s','%d','%s','%s');
	`,
		endEleID+1, ele.ElectionName, ele.StartDate, ele.EndDate, ele.Count, ele.Status, ele.Admin)
	_, err = db.Exec(s)
	if err != nil {
		return err
	}

	for i := 0; i < len(ele.Questions); i++ {
		qu := ele.Questions
		endQuID = endQuID + 1
		s += fmt.Sprintf(`INSERT INTO votingsystem.questions (id, name, electionID, optionType) VALUE ('%d','%s','%d','%d');
		`,
			endQuID, qu[i].QuestionName, endEleID+1, qu[i].ChoiceType)
		_, err = db.Exec(s)
		if err != nil {
			return err
		}
		for j := 0; j < len(qu[i].Options); j++ {
			op := qu[i].Options
			endOpID = endOpID + 1
			s += fmt.Sprintf(`INSERT INTO votingsystem.options (id, questionID, label, count) VALUE ('%d','%d','%s','%d');
			`,
				endOpID, endQuID, op[j].Label, 0)
			_, err = db.Exec(s)
			if err != nil {
				return err
			}
		}
	}
	fmt.Println(s)
	// stmt, err := db.Prepare(s)
	// if err != nil {
	// 	return err
	// }

	// _, err = stmt.Exec()
	// if err != nil {
	// 	return err
	// }

	return nil
}
