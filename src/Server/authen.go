package main

import (
	"github.com/dgrijalva/jwt-go"
	"time"
	"fmt"
)

func createToken(username string) string {
	nbf := time.Now().Local().Add(time.Hour*time.Duration(0) +
		time.Minute*time.Duration(30) +
		time.Second*time.Duration(0))

	var privateKey = []byte("jmy2Lem12VOlq33RunwWFbeSYb22GZDdLFKjIWuTUxB8d8K9B6Qxx3ADrSG0POia")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"nbf":      nbf.Unix(),
		"admin":    false,
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(privateKey)

	fmt.Println(tokenString, err)
	return tokenString
}
