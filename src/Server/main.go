//For reference: https://godoc.org/net/http

package main

import (
	"fmt"
	"net/http"
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
	h := http.NewServeMux()
	h.HandleFunc("/signup", signupHandler)
	h.HandleFunc("/signin", signinHandler)
	http.ListenAndServe(":4500", h)
}
