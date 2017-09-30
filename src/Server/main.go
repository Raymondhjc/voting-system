//For reference: https://godoc.org/net/http

package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
)

// struct
type RegistrationInfo struct {
	FirstName string
	LastName  string
	Username  string
	Password  string
	Email     string
	Ufid      string
}

type SigninInfo struct {
	Username string
	Password string
}

// handler
func readBytes(r *http.Request) []byte {
	file, e := ioutil.ReadAll(r.Body)
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}
	return file
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t RegistrationInfo
	json.Unmarshal(file, &t)

	fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
		t.FirstName, t.LastName, t.Username, t.Password, t.Email, t.Ufid)

	fmt.Fprintf(w, "You reached /%s", r.URL.Path[1:])
}

func signinHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t SigninInfo
	json.Unmarshal(file, &t)

	fmt.Printf("SIGNIN:\nUsername: %v\nPassword: %v\n", t.Username, t.Password)

	fmt.Fprintf(w, "You reached /%s", r.URL.Path[1:])
}

// main
func main() {
	fmt.Println("Running ...")

	// mux:
	h := http.NewServeMux()
	h.HandleFunc("/signup", signupHandler)
	h.HandleFunc("/signin", signinHandler)
	http.ListenAndServe(":4400", h)
}
