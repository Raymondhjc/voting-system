package main

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/mitchellh/mapstructure"
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
	results, err := getQusetionResult(t.ElectionID, t.QuestionID)
	check(err)
	//return the right data to the front-end
	json.NewEncoder(w).Encode(results)
}

//get the questions under every election
func getQestionsHandler(w http.ResponseWriter, r *http.Request) {
	data := readBytes(r)
	var t ElectionID
	json.Unmarshal(data, &t)

	result, err := getQusetions(t)
	check(err)
	//return the right data to the front-end
	json.NewEncoder(w).Encode(result)
}

//handle the data-change things
// receive { "ElectionID": int ,"BallotID": int , "Answers" :[{"question" : "int ","answer" : "context"}]}
func ballotcheckHandler(w http.ResponseWriter, r *http.Request) {
	data := readBytes(r)
	var t DataChange
	json.Unmarshal(data, &t)
	//for each answer, if it changes then change the number
	for i := 0; i < len(t.Answer); i++ {
		//[]int the ID of the options
		answerUnchanged, rate, err := getBallotData(t.Answers[i].question, t.BallotID)
		if answerUnchanged != t.Answers[i].answer {
			// -1 : the number that has been changed
			if len(answerUnchanged) > 0 {
				for j := 0; j < len(answerUnchanged); j++ {
					minusCountValue("unsurevotes", answerUnchanged[j], t.ElectionID)
					minusCountValue("totalvotes", answerUnchanged[j], t.ElectionID)
				}
			}
			// +1 : the number that has been changed
			if len(t.Answers[i].answer) > 0 {
				for j := 0; j < len(t.Answers[i].answer); j++ {
					addCountValue("soundvotes", t.Answers[i].answer[j], t.ElectionID)
					addCountValue("totalvotes", t.Answers[i].answer[j], t.ElectionID)
				}
			}
		}

	}
}
