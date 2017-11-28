// Dependencies:
// go get github.com/urfave/negroni
// go get github.com/dgrijalva/jwt-go
// go get github.com/gorilla/mux
// go get github.com/gorilla/handlers
// go get github.com/gorilla/context
// go get github.com/go-sql-driver/mysql
// go get github.com/mitchellh/mapstructure

// To generate RSA KEY:
//

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

	// Database Credential
	var username = "ufse"
	var password = "voting-system"
	var address = "127.0.0.1:3306"
	var dbName = "votingsystem"

	// Open and close Database
	err = db.connectDB(username, password, address, dbName)
	check(err)
	defer db.disconnectDB()

	// Multiplexer.
	r := mux.NewRouter()

	// Declare the static file directory and point it to the
	// directory we just made
	staticFileDirectory := http.Dir("../ImageFiles/")
	// Declare the handler, that routes requests to their respective filename.
	// The fileserver is wrapped in the `stripPrefix` method, because we want to
	// remove the "/ImageFiles/" prefix when looking for files.
	// For example, if we type "/ImageFiles/index.html" in our browser, the file server
	// will look for only "index.html" inside the directory declared above.
	// If we did not strip the prefix, the file server would look for
	// "./ImageFiles/ImageFiles/index.html", and yield an error
	staticFileHandler := http.StripPrefix("/ImageFiles/", http.FileServer(staticFileDirectory))
	// The "PathPrefix" method acts as a matcher, and matches all routes starting
	// with "/ImageFiles/", instead of the absolute route itself
	r.PathPrefix("/ImageFiles/").Handler(staticFileHandler).Methods("GET")

	//Handlers
	r.HandleFunc("/signup", signupHandler).Methods("POST")
	r.HandleFunc("/signin", signinHandler).Methods("POST")
	r.HandleFunc("/exists/{username}", userExistHandler).Methods("GET")
	r.HandleFunc("/whoami", authorize(whoamiHandler)).Methods("GET")
	r.HandleFunc("/changePassword", authorize(changePasswordHandler)).Methods("POST")
	r.HandleFunc("/changeEmail", authorize(changeEmailHandler)).Methods("POST")
	r.HandleFunc("/upload", upload).Methods("GET")
	r.HandleFunc("/upload", upload).Methods("POST")
	r.HandleFunc("/download", getVotingImagesHandler).Methods("GET")
	r.HandleFunc("/getElectionList", authorize(getElectionListHandler)).Methods("GET")
	r.HandleFunc("/addElection", authorize(addElectionHandler)).Methods("POST")

	// Allow Cross Origin Resource Sharing with CORS middleware.
	headersOk := handlers.AllowedHeaders([]string{"Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	// Start Listening.
	http.ListenAndServe(":4500", handlers.CORS(headersOk, originsOk)(r))
}
