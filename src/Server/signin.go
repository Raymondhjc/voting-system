package main

import (
	"net/http"
	"encoding/json"
	"fmt"
)

type SigninInfo struct {
	Username string
	Password string
}

type SigninResponse struct {
	Success  bool
	Username string
	JWT      string
}

func signinHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t SigninInfo
	json.Unmarshal(file, &t)

	if verbose {
		fmt.Printf("SIGNIN:\nUsername: %v\nPassword: ??\n", t.Username)
	}

	hash, err := db.getUserHash(t.Username)
	check(err)
	match := CheckPasswordHash(t.Password, hash);
	if match {
		response := SigninResponse{true, t.Username, createToken(t.Username)}
		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)

	} else {
		//w.WriteHeader(http.StatusBadRequest)

		response := SigninResponse{false, "", ""}
		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)	}

}
