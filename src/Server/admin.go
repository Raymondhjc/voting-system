package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Reading RSA keys for creating JWT, name is fixed.
	// jwtRS256.key for private key. jwtRS256.key.pub for public key
	initKeys()

	// Provide some debug Information
	if verbose {
		fmt.Println("Running under verbose mode ...")
	} else {
		fmt.Println("Running ...")
	}

	// Multiplexer.
	r := mux.NewRouter()
	//Handlers
	r.HandleFunc("/admin", adminHandler).Methods("POST")

	// Start Listening.
	http.ListenAndServe(":4500", handlers.CORS(headersOk, originsOk)(r))
}
