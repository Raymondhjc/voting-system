//github.com/urfave/negroni
//github.com/dgrijalva/jwt-go
//go get -u github.com/gorilla/mux

package main

import (
  "fmt"
  "net/http"
  "github.com/gorilla/mux"
  "github.com/gorilla/handlers"
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

  err = db.connectDB(username, password, address, dbName)
  check(err)

  defer db.disconnectDB()

  // mux:
  r := mux.NewRouter()
  r.HandleFunc("/signup", signupHandler).Methods("POST")
  r.HandleFunc("/signin", signinHandler).Methods("POST")
  r.HandleFunc("/exists/{username}", userExistHandler).Methods("GET")
  r.HandleFunc("/whoami", authorize(whoamiHandler)).Methods("GET")
  r.HandleFunc("/changePassword", authorize(changePasswordHandler)).Methods("POST")

  headersOk := handlers.AllowedHeaders([]string{"Authorization"})
  originsOk := handlers.AllowedOrigins([]string{"*"})

  http.ListenAndServe(":4500", handlers.CORS(headersOk,originsOk)(r))
}

