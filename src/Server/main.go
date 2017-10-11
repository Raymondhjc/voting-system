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
	}else{
		fmt.Println("Running ...")
	}

	connectDB()
	defer disconnectDB()

	// mux:
	r := mux.NewRouter()
	r.HandleFunc("/signup", signupHandler)
	r.HandleFunc("/signin", signinHandler)
	r.HandleFunc("/exists/{username}", userExistHandler)
	http.ListenAndServe(":4500", r)
}


