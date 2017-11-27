package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func getElectionListHandler(w http.ResponseWriter, r *http.Request) {
	// get user
	admin := "111111"
	list, err := db.getElectionList(admin)
	check(err)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(list)
}

func addElectionHandler(w http.ResponseWriter, r *http.Request) {
	request := readBytes(r)
	var ele NewElection
	err := json.Unmarshal(request, &ele)
	if err != nil {
		fmt.Println("JSON ERROR:", err)
	}
	dberr, endEleID, endQuID, endOpID := db.assignID()
	dberr = db.insertElection(ele, endEleID)
	for i := 0; i < len(ele.Questions); i++ {
		qu := ele.Questions
		endQuID = endQuID + 1
		dberr = db.insertQuestion(qu, endQuID, endEleID, i);
		for j := 0; j < len(qu[i].Options); j++ {
			op := qu[i].Options
			endOpID = endOpID + 1
			dberr = db.insertOption(op, endOpID, endQuID, j);
		}
	}
	if dberr != nil {
		fmt.Println("DB ERROR:", dberr)
	} else {
		w.WriteHeader(http.StatusOK)
	}

}
