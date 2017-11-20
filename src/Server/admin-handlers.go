package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func getElectionListHandler(w http.ResponseWriter, r *http.Request) {
	username := mux.Vars(r)["username"]
	exist, err := db.userCredentialIsExist(username)
	check(err)

	w.WriteHeader(http.StatusOK)
	enc := json.NewEncoder(w)
	d := map[string]bool{"exist": exist}

	if verbose {
		fmt.Println("User exist query:", d)
	}

	enc.Encode(d)
}
