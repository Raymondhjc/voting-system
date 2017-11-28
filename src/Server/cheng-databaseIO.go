/* this file is going to get the information from the database
1 each question's answers' data
this file is going to change the database's data
//Table we save the ballots and the data to the ballot
//first we receive the ballot's name and the changed result
//we get the origin result of the ballot
//we change the table saving all the result :delete origin and add the new result
*/

package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

//get the answer to the question rows(data-view)
func (db *MyDB) getQuestionResult(questionID int, electionID int) ([]DataOfQuestion, error) {
	q := fmt.Sprintf(`SELECT ID,optionName,soundvotes,unsurevotes,totalvotes FROM votingsystem.result WHERE questionID = %d AND electionID = %d;`, questionID, electionID)
	rows, err := db.Query(q)
	var results []DataOfQuestion

	if err != nil {
		return nil, err
	}
	if rows.Next() {
		var result DataOfQuestion
		err = rows.Scan(&result.ID, &result.Name, &result.Votes[0], &result.Votes[1], &result.Votes[2])
		results = append(results, result)
	}
	return results, nil
}

//get questions of the election
func (db *MyDB) getQuestions(electionID int) ([]string, error) {
	var results []string
	q1 := fmt.Sprintf(`SELECT name FROM votingsystem.questions WHERE  electionID = %d;`, electionID)
	rows, err := db.Query(q1)
	if err != nil {
		log.Fatal(err)
	}
	if rows.Next() {
		var result string
		err = rows.Scan(&result)
		results = append(results, result)
	}
	return results, nil

}

//done
//get the data of the ballot the whole row answer to the question and the correct probability
func (db *MyDB) getBallotData(questionID int, ballot int) (string, error) {
	// get the answer to the question and rateOfRight
	//var rateOfRight int

	var answer string

	q1 := fmt.Sprintf(`SELECT optionName FROM votingsystem.ballots WHERE ballotID= '%d' AND questionID = %d;`, ballot, questionID)
	//q2 := fmt.Sprintf(`SELECT rate0fRight FROM votingsystem.ballots WHERE ballotID= '%d' AND questionID = %d;`, ballot, questionID)
	rows, err := db.Query(q1)
	//err = db.QueryRow(q2).Scan(&rateOfRight)
	defer rows.Close()

	if rows.Next() {
		var optionName string
		err2 := rows.Scan(&optionName)
		if err2 != nil {
			log.Fatal(err)
		}
		answer = optionName
	}
	//scan the rate to rateOfRight
	if err != nil {
		fmt.Println("get ballot data failed:", err.Error())
		return "", err
	}
	fmt.Println(answer)
	return answer, nil

}

//change the data of the answer to the result
func (db *MyDB) addCountValue(counttype string, optionName string, electionID int) {
	q1 := fmt.Sprintf(`SELECT %s FROM votingsystem.result WHERE optionName ='%s' AND electionID = %d;`, counttype, optionName, electionID)
	var number int8
	err := db.QueryRow(q1).Scan(&number)
	//fmt.Println(`%s:%d `, counttype, number)
	if err != nil {
		log.Fatal(err)
	}

	q2 := fmt.Sprintf(`UPDATE votingsystem.result SET %s = %d WHERE optionName ='%s' AND electionID = %d;`, counttype, number+1, optionName, electionID)
	r, err3 := db.Query(q2)
	if r == nil {
		log.Fatal(err)

	}
	if err3 != nil {
		log.Fatal(err)
	}
}

//change the data of the answer to the result
func (db *MyDB) minusCountValue(counttype string, optionName string, electionID int) {
	q1 := fmt.Sprintf(`SELECT %s FROM votingsystem.result WHERE optionName ='%s'`, counttype, optionName)
	var number int8
	err := db.QueryRow(q1).Scan(&number)
	//fmt.Println(`%s:%d `, counttype, number)
	if err != nil {
		log.Fatal(err)
	}
	q2 := fmt.Sprintf(`UPDATE votingsystem.result SET %s = %d WHERE optionName ='%s' AND electionID = %d;`, counttype, number-1, optionName, electionID)
	r, err2 := db.Query(q2)
	if r == nil {
		log.Fatal(err)
	}
	if err2 != nil {
		log.Fatal(err)
	}
}
