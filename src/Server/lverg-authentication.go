package main

import (
  "time"
  "fmt"
  "log"
  "io/ioutil"
  "crypto/rsa"
  "net/http"
  "strings"
  "encoding/json"
  "github.com/dgrijalva/jwt-go"
  "github.com/gorilla/context"
)

// Storing keys for creating JWT
var publicKey *rsa.PublicKey
var privateKey *rsa.PrivateKey

const (
  privKeyPath = "./jwtRS256.key"
  pubKeyPath  = "./jwtRS256.key.pub"
)

func initKeys() {
  var err error

  rawPrivateKey, err := ioutil.ReadFile(privKeyPath)
  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

  privateKey, err = jwt.ParseRSAPrivateKeyFromPEM(rawPrivateKey)

  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

  rawPublicKey, err := ioutil.ReadFile(pubKeyPath)
  if err != nil {
    log.Fatal("Error reading public key")
    return
  }
  publicKey, err = jwt.ParseRSAPublicKeyFromPEM(rawPublicKey)

  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

}

func jstAssigner(username string) string {
  exp := time.Now().Local().Add(time.Hour*time.Duration(100000) +
    time.Minute*time.Duration(0) +
    time.Second*time.Duration(0))

  token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
    "iss": "voting-system",
    "usr": username,
    "exp": exp.Unix(),
    "rol": "user",
  })

  tokenString, err := token.SignedString(privateKey)
  fmt.Println(tokenString)

  if err != nil {
    log.Printf("Error signing token: %v\n", err)
  }
  return tokenString
}

func authorize(next http.HandlerFunc) http.HandlerFunc {
  return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
    authorizationHeader := req.Header.Get("authorization")
    if authorizationHeader != "" {
      bearerToken := strings.Split(authorizationHeader, " ")
      if len(bearerToken) == 2 {
        token, _ := jwt.Parse(bearerToken[1], func(token *jwt.Token) (interface{}, error) {
          if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
            return nil, fmt.Errorf("There was an error")
          }
          return publicKey, nil
        })
        //if error != nil {
        //  json.NewEncoder(w).Encode(Exception{Message: error.Error()})
        //  return
        //}
        if token.Valid {
          context.Set(req, "jwtContent", token.Claims)
          next(w, req)
        } else {
          json.NewEncoder(w).Encode(Exception{Message: "Invalid authorization token"})
        }
      }
    } else {
      json.NewEncoder(w).Encode(Exception{Message: "An authorization header is required"})
    }
  })
}

