package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
)

//For reference: https://godoc.org/net/http

type RegistrationInfo struct {
	FirstName string
	LastName  string
	Username  string
	Password  string
	Email     string
	Ufid      string
}

func handler(w http.ResponseWriter, r *http.Request) {
	//decoder := json.NewDecoder(r.Body)
	//var t registrationInfo
	//err := decoder.Decode(&t)
	//if err != nil {
	//	panic(err)
	//}
	//defer r.Body.Close()
	//log.Println(t.firstName)
	//log.Println(t.lastName)
	//log.Println(t.username)
	//log.Println(t.password)
	//log.Println(t.email)
	//log.Println(t.ufid)

	file, e := ioutil.ReadAll(r.Body)
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}
	var t RegistrationInfo
	json.Unmarshal(file, &t)

	fmt.Printf("Result:\n%v\n",t)

	fmt.Fprintf(w, "Hi there, you reached /%s!", r.URL.Path[1:])
}

func main() {
	fmt.Println("Executing...")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":4400", nil)
}
