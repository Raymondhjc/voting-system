package main

import (
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
)

type RegistrationInfo struct {
	FirstName string
	LastName  string
	Username  string
	Password  string
	Email     string
	Ufid      string
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t RegistrationInfo
	json.Unmarshal(file, &t)

	if verbose {
		fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
			t.FirstName, t.LastName, t.Username, "?", t.Email, t.Ufid)
	}

	if registrate(t) {
		w.Write([]byte("Successful!"))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("This username has been taken!"))
	}

}

func userExistHandler(w http.ResponseWriter, r *http.Request) {
	username := mux.Vars(r)["username"]
	q := fmt.Sprintf(`SELECT username FROM votingsystem.users WHERE username = '%s';`, username)
	rows, err := db.Query(q)
	check(err)

	exist := rows.Next()



	enc := json.NewEncoder(w)
	d := map[string]bool{"exist": exist}

	if verbose {
		fmt.Println("User exist query:", d)
	}

	enc.Encode(d)
}
