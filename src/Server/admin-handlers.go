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
	dberr := db.insertElection(ele)
	if dberr != nil {
		fmt.Println("db error:", dberr)
	} else {
		w.WriteHeader(http.StatusOK)
	}

}
