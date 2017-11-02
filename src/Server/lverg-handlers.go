package main

import (
  "net/http"
  "encoding/json"
  "fmt"
  "github.com/gorilla/context"
  "github.com/gorilla/mux"
  "github.com/mitchellh/mapstructure"
  "github.com/dgrijalva/jwt-go"
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

func signupHandler(w http.ResponseWriter, r *http.Request) {
  file := readBytes(r)
  var t RegistrationInfo
  json.Unmarshal(file, &t)

  if verbose {
    fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
      t.FirstName, t.LastName, t.Username, "?", t.Email, t.Ufid)
  }

  success, err := registrate(t)
  check(err)

  if success {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Successful!"))
  } else {
    w.WriteHeader(http.StatusBadRequest)
    w.Write([]byte("This username has been taken!"))
  }

}

func userExistHandler(w http.ResponseWriter, r *http.Request) {
  username := mux.Vars(r)["username"]
  exist, err := db.userCredentialIsExist(username)
  check(err)

  w.WriteHeader(http.StatusOK)
  enc := json.NewEncoder(w)
  d := map[string]bool{"exist": exist}

  if verbose {
    fmt.Println("User exist query:", d)
  }

  enc.Encode(d)
}

func whoamiHandler(w http.ResponseWriter, req *http.Request) {
  // Declaration
  var claims JwtClaims

  // get the jwt context.
  jwtContent := context.Get(req, "jwtContent")

  // Convert to structure.
  mapstructure.Decode(jwtContent.(jwt.MapClaims), &claims)

  // Get data from database.
  userInfo, err := db.getUserInfo(claims.Usr)

  // Error Handling/
  check(err)

  // reply.
  json.NewEncoder(w).Encode(userInfo)
}

func changePasswordHandler(w http.ResponseWriter, req *http.Request) {
  var claims JwtClaims
  var requestContent ModifyPasswordRequest
  file := readBytes(req)
  jwtContent := context.Get(req, "jwtContent")

  mapstructure.Decode(jwtContent.(jwt.MapClaims), &claims)
  json.Unmarshal(file, &requestContent)

  match := CheckPasswordHash(claims.Usr, requestContent.Password)
  if match {
    hash, _ := HashPassword(requestContent.NewPassword)
    _, err := db.updatePasswordHash(claims.Usr, hash)
    check(err)
    w.WriteHeader(http.StatusOK)
  } else {
    fmt.Println(requestContent.Password)
    response := Exception{Message: "Your password is not correct."}
    js, _ := json.Marshal(response)
    w.WriteHeader(http.StatusBadRequest)
    w.Header().Set("Content-Type", "application/json")
    w.Write(js)
  }
}

func changeEmailHandler(w http.ResponseWriter, req *http.Request) {
  var claims JwtClaims
  var requestContent ModifyEmailRequest
  file := readBytes(req)
  jwtContent := context.Get(req, "jwtContent")

  mapstructure.Decode(jwtContent.(jwt.MapClaims), &claims)
  json.Unmarshal(file, &requestContent)

  _, err := db.updateEmail(claims.Usr, requestContent.NewEmail)
  check(err)
  w.WriteHeader(http.StatusOK)
}

