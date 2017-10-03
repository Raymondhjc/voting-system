package main

import (
	"github.com/dgrijalva/jwt-go"
	"time"
	"fmt"
)

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
