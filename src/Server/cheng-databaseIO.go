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
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

type MyDB struct {
	*sql.DB
}

var db MyDB

//get the answer to the question rows(data-view)
func (db *MyDB) getQuestionResult(questionID int, electionID int) ( []DataOfQuestion, error) {
	q := fmt.Sprintf(`SELECT ID,optionName,soundvotes,unsurevotes,totalvotes FROM votingsystem.result WHERE questionID = %d AND eletionID = %d;`, questionID, electionID)
	rows, err := db.Query(q)
	var results []DataOfQuestion

	if err != nil{
		return "", err
	}
	if rows.Next(){
		var result DataOfQuestion
		err = rows.Scan(&result.ID.&result.Name,&result.Votes[0],&result.Votes[1],&result.Votes[2])
		results = append(results, result)
	}
	return results , nil 
}
//done
//get the data of the ballot the whole row answer to the question and the correct probability 
func (db *MyDB) getBallotData(questionID int, ballot int) ([]int, int , error) {
	// get the answer to the question and rateOfRight
	var rateOfRight int 
	var answer []int
	result = ""
	q1 = fmt.Sprintf(`SELECT optionID FROM votingsystem.ballots WHERE ballotID= '%d' AND questionID = %d;`,ballot, questionID)
	q2 = fmt.Sprintf(`SELECT rate0fRight FROM votingsystem.ballots WHERE ballotID= '%d' ;` , ballot)
	rows,err := db.Query(q1)
	err := db.QueryRow(q2).Scan(&rateOfRight)
	defer rows.Close()

	for rows.Next(){
		var optionID int
		err : = row.Scan(&optionID)
		if err != nil{
			log.Fatal(err)
		}
		answer = append(answer, optionID)
	}
	//scan the rate to rateOfRight
	if err != nil {
		fmt.Println("get ballot data failed:", err.Error())
    	return "", err
  	}
  	return answer, rateOfRight, nil

}

//change the data of the answer to the result
func (db *MyDB) addCountValue(counttype string, optionID int, electionID int) {
	q1 = fmt.Sprintf(`SELECT %s FROM votingsystem.result WHERE ID ='%d' AND electionID = %d;`,counttype, optionID, electionID)
	var number int8
	err := db.QueryRow(q1).Scan(&number)
	if err != nil
		log.Fatal(err)
	q2 = fmt.Sprintf(`UPDATE votingsystem.result SET %s = %d WHERE ID ='%d' AND electionID = %d;`,counttype, number+1, optionID, electionID)
	err := db.Query(q2)
	if err != nil
		log.Fatal(err)
}

//change the data of the answer to the result
func (db *MyDB) minusCountValue(counttype string, optionID int, electionID int)  {
	q1 = fmt.Sprintf(`SELECT %s FROM votingsystem.result WHERE ID ='%d' AND electionID = %d;`,counttype, optionID, electionID)
	var number int8
	err := db.QueryRow(q1).Scan(&number)
	if err != nil
		log.Fatal(err)
	q2 = fmt.Sprintf(`UPDATE votingsystem.result SET %s = %d WHERE ID ='%d' AND electionID = %d;`,counttype, number-1, optionID, electionID)
	err := db.Query(q2)
	if err != nil
		log.Fatal(err)
}
