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

//get the answer to the question
func (db *MyDB) getProblemAnswer(number int) (string, error) {

}

//get the data of the ballot
func (db *MyDB) getBallotData(ballot string) (string, error) {

}

//change the data of the answer to the result
func (db *MyDB) addCountValue(counttype string, answer string, question string) (string, error) {

}

//change the data of the answer to the result
func (db *MyDB) minusCountValue(counttype string, answer string, question string) (string, error) {

}
