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

type SigninResponse struct{
	Username string
	JWT string
}

func signinHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t SigninInfo
	json.Unmarshal(file, &t)

	fmt.Printf("SIGNIN:\nUsername: %v\nPassword: %v\n", t.Username, t.Password)

	if t.Username == "lvergergsk" && t.Password == "frozenFrog" {
		response:=SigninResponse{t.Username, createToken(t.Username)}
		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)

	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Username and Password combination does not exist"))
	}

}
