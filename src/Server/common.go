package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
	"os"
	"log"
)

var verbose = true

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func readBytes(r *http.Request) []byte {
	file, e := ioutil.ReadAll(r.Body)
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}
	return file
}
