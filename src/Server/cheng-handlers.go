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
//this function is to get the data from the database and return it to the front-end
func dataviewHandler(w http.ResponseWriter, r *http.Request) {

      //assume we already get the information
      //first get the request from the front-end type 3 ? the questions
      file := readBytes(r)
      var t 
      //get the correct data from the database
      //return the right data to the front-end


}
//handle the data-change thinds
func ballotcheckHandler(w http.ResponseWriter, r *http.Request){


}
