package main

import (
	"encoding/json"
	"net/http"
)



func getElectionListHandler(w http.ResponseWriter, r *http.Request) {
	//username := mux.Vars(r)["username"]
	admin := "111111"
	list, err := db.getElectionList(admin)
	check(err)

	// reply.
	
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(list)
}
