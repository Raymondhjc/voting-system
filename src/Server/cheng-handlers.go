package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

//this function is to get the data from the database and return it to the front-end
//receive'{ "election": int , "question" : int}'
//return  '{ "ID": ,"name": , votes : [num1,num2,num3]},
//{"ID","name",votes : [num1,num2,num3]},{}]}'
func dataviewHandler(w http.ResponseWriter, r *http.Request) {

	//assume we already get the information
	//first get the request from the front-end type 3 ? the questions
	data := readBytes(r)
	//get the correct data from the database
	var t DataRequestInfo
	json.Unmarshal(data, &t)
	//results := []DataOfQuestion
	results, err := db.getQuestionResult(t.ElectionID, t.QuestionID)
	check(err)
	//return the right data to the front-end
	json.NewEncoder(w).Encode(results)
}

//get the questions under every election
func getQuestionsHandler(w http.ResponseWriter, r *http.Request) {
	data := readBytes(r)
	var t ElectionID
	json.Unmarshal(data, &t)

	result, err := db.getQuestions(t.ElectionID)
	check(err)
	//return the right data to the front-end
	json.NewEncoder(w).Encode(result)
}

//handle the data-change things
// receive { "BallotID": int , " ElectionID" : int , Results" :[{"answer1","answer2","answer3"}]}
func ballotcheckHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("handle datachange")
	data := readBytes(r)
	var t DataChange
	json.Unmarshal(data, &t)
	fmt.Println(t)
	fmt.Println(t.Results)
	//for each answer, if it changes then change the number
	//for i := 0; i < len(t.Results); i++ {
	for i := 0; i < 0; i++ {
		//[]int the ID of the options
		answerUnchanged, err := db.getBallotData(i, t.BallotID)
		if err != nil {
			log.Fatal(err)
		}
		if answerUnchanged != t.Results[i] {
			// -1 : the number that has been changed
			db.minusCountValue("unsurevotes", answerUnchanged, t.ElectionID)
			db.minusCountValue("totalvotes", answerUnchanged, t.ElectionID)

			// +1 : the number that has been changed

			db.addCountValue("soundvotes", t.Results[i], t.ElectionID)
			db.addCountValue("totalvotes", t.Results[i], t.ElectionID)
		}
	}
}
