package main

import (
  "net/http"
  "io/ioutil"
  "log"
  "golang.org/x/crypto/bcrypt"
  "database/sql"
)

var verbose = true
var db MyDB
var err error

type MyDB struct {
  *sql.DB
}

func check(err error) {
  if err != nil {
    log.Fatal(err)
  }
}

func readBytes(r *http.Request) []byte {
  file, err := ioutil.ReadAll(r.Body)
  check(err)
  return file
}

func HashPassword(password string) (string, error) {
  bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
  return string(bytes), err
}

func CheckPasswordHash(user string, pass string) bool {
  hash, _ := db.getUserHash(user)
  err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))
  return err == nil
}
