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
	file := readBytes(r)
	var t Election
	json.Unmarshal(file, &t)

	if verbose {
		fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
			t.FirstName, t.LastName, t.Username, "?", t.Email, t.Ufid)
	}

	success, err := registrate(t)
	check(err)

	if success {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Exception{Message: "This username has been taken!"})
	}

}
