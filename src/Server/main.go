//For reference: https://godoc.org/net/http

package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
	"github.com/dgrijalva/jwt-go"
	"time"
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

type SigninResponse struct{
	Username string
	JWT string
}

// jwt
func createToken(username string) string {
	var privateKey=[]byte("jmy2Lem12VOlq33RunwWFbeSYb22GZDdLFKjIWuTUxB8d8K9B6Qxx3ADrSG0POia")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"nbf":      time.Date(2018, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(privateKey)

	fmt.Println(tokenString, err)
	return tokenString
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

	if t.Username == "junkfood" && t.Password == "frenchfries" {
		response:=SigninResponse{t.Username, createToken(t.Username)}
		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)

	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Username and Password combination does not exist"))
	}

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
