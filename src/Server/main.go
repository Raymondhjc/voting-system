<<<<<<< HEAD
//github.com/urfave/negroni
//github.com/dgrijalva/jwt-go
=======
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
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f

package main

import (
<<<<<<< HEAD
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
	initKeys()

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
=======
  "fmt"
  "net/http"
  "github.com/gorilla/mux"
  "github.com/gorilla/handlers"
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
  //Handlers
  r.HandleFunc("/signup", signupHandler).Methods("POST")
  r.HandleFunc("/signin", signinHandler).Methods("POST")
  r.HandleFunc("/exists/{username}", userExistHandler).Methods("GET")
  r.HandleFunc("/whoami", authorize(whoamiHandler)).Methods("GET")
  r.HandleFunc("/changePassword", authorize(changePasswordHandler)).Methods("POST")
  r.HandleFunc("/changeEmail",authorize(changeEmailHandler)).Methods("POST")

  // Allow Cross Origin Resource Sharing with CORS middleware.
  headersOk := handlers.AllowedHeaders([]string{"Authorization"})
  originsOk := handlers.AllowedOrigins([]string{"*"})

  // Start Listening.
  http.ListenAndServe(":4500", handlers.CORS(headersOk,originsOk)(r))
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
}

