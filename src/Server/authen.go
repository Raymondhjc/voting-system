package main

import (
	"github.com/dgrijalva/jwt-go"
	"time"
	"fmt"
	"log"
	"io/ioutil"
	"crypto/rsa"
)

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
	exp := time.Now().Local().Add(time.Hour*time.Duration(0) +
		time.Minute*time.Duration(30) +
		time.Second*time.Duration(0))

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
		"iss": "admin",
		"usr": username,
		"exp": exp.Unix(),
		"rol": "user",
	})

	tokenString, err := token.SignedString(privateKey)
	fmt.Println(tokenString)

	if err != nil {
		log.Printf("Error signing token: %v\n", err)
	}
	return tokenString;
}

//func jwtValidator(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
//
//	//validate token
//	token, err := request.ParseFromRequest(r, request.AuthorizationHeaderExtractor, func(token *jwt.Token) (interface{}, error) {
//		return publicKey, nil
//	})
//
//	if err == nil {
//
//		if token.Valid {
//			next(w, r)
//		} else {
//			w.WriteHeader(http.StatusUnauthorized)
//			fmt.Fprint(w, "Token is not valid")
//		}
//	} else {
//		w.WriteHeader(http.StatusUnauthorized)
//		fmt.Fprint(w, "Unauthorised access to this resource")
//	}
//
//}
