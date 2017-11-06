package main

import (
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
)



func signupHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t RegistrationInfo
	json.Unmarshal(file, &t)

	if verbose {
		fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
			t.FirstName, t.LastName, t.Username, "?", t.Email, t.Ufid)
	}

	success, err := registrate(t)
	check(err)

	if success {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Successful!"))
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("This username has been taken!"))
	}

}

func userExistHandler(w http.ResponseWriter, r *http.Request) {
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
