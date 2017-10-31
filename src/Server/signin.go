package main

import (
  "net/http"
  "encoding/json"
  "fmt"
)

func signinHandler(w http.ResponseWriter, r *http.Request) {
  file := readBytes(r)
  var t SigninInfo
  json.Unmarshal(file, &t)

  if verbose {
    fmt.Printf("SIGNIN:\nUsername: %v\nPassword: ??\n", t.Username)
  }

  match := CheckPasswordHash(t.Username, t.Password)
  if match {
    response := SigninResponse{true, t.Username, jstAssigner(t.Username)}
    js, _ := json.Marshal(response)
    w.Header().Set("Content-Type", "application/json")
    w.Write(js)

  } else {
    response := Exception{Message: "Username and password combination does not exist."}
    js, _ := json.Marshal(response)
    w.WriteHeader(http.StatusBadRequest)
    w.Header().Set("Content-Type", "application/json")
    w.Write(js)
  }

}
