//For reference: https://godoc.org/net/http

package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
)

//should included in all request e.g. put get ...
type requestAuth struct {
	JWT string
}

// main
func main() {
	if verbose {
		fmt.Println("Running under verbose mode ...")
	} else {
		fmt.Println("Running ...")
	}

	var username = "ufse"
	var password = "voting-system"
	var address = "127.0.0.1:3306"
	var dbName = "votingsystem"

	err=db.connectDB(username, password, address, dbName)
	check(err)

	defer db.disconnectDB()

	// mux:
	r := mux.NewRouter()
	r.HandleFunc("/signup", signupHandler)
	r.HandleFunc("/signin", signinHandler)
	r.HandleFunc("/exists/{username}", userExistHandler)
	http.ListenAndServe(":4500", r)
}
