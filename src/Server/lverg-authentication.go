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

// Storing RSA256 keys for creating JWT
var publicKey *rsa.PublicKey
var privateKey *rsa.PrivateKey

// The path to keys
const (
  privKeyPath = "./jwtRS256.key"
  pubKeyPath  = "./jwtRS256.key.pub"
)

// This function initialize Keys required for generate JWT.
func initKeys() {
  var err error

  // reading private key.
  rawPrivateKey, err := ioutil.ReadFile(privKeyPath)
  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

  // convert.
  privateKey, err = jwt.ParseRSAPrivateKeyFromPEM(rawPrivateKey)

  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

  // reading public key.
  rawPublicKey, err := ioutil.ReadFile(pubKeyPath)
  if err != nil {
    log.Fatal("Error reading public key")
    return
  }

  // convert.
  publicKey, err = jwt.ParseRSAPublicKeyFromPEM(rawPublicKey)

  if err != nil {
    log.Fatal("Error reading private key")
    return
  }

}

// given a username, this function assign a JWT to this username.
func jstAssigner(username string) string {
  // Generate expiration time.
  exp := time.Now().Local().Add(time.Hour*time.Duration(100000) +
    time.Minute*time.Duration(0) +
    time.Second*time.Duration(0))

  var role string
  if username == "admin" {
    role = "admin"
  } else {
    role = "user"
  }

  // set claims for JWT
  token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
    "iss": "voting-system",
    "usr": username,
    "exp": exp.Unix(),
    "rol": role,
  })

  // Using private key to generate JWT.
  tokenString, err := token.SignedString(privateKey)
  if verbose {
    fmt.Println(tokenString)
  }

  if err != nil {
    log.Printf("Error signing token: %v\n", err)
  }
  return tokenString
}

// Using public key to check JWT.
// if JWT is valid, assign user information to
func authorize(next http.HandlerFunc) http.HandlerFunc {
  return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
    // Get the authorization header.
    authorizationHeader := req.Header.Get("authorization")
    // If there is no authorization header then:
    if authorizationHeader != "" {

      bearerToken := strings.Split(authorizationHeader, " ")
      // If JWT is correct formatted, then it should have space separated string.
      if len(bearerToken) == 2 {
        token, error := jwt.Parse(bearerToken[1], func(token *jwt.Token) (interface{}, error) {
          if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
            return nil, fmt.Errorf("There was an error")
          }
          return publicKey, nil
        })
        if error != nil {
          json.NewEncoder(w).Encode(Exception{Message: error.Error()})
          return
        }
        if token.Valid {
          // set claim, pass claim to next handler
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
