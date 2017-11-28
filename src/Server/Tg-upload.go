package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
)

func upload(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		// GET
		t, _ := template.ParseFiles("../app/upload-page/upload-page.component.html")

		err := t.Execute(w, nil)

		if err != nil {
			fmt.Println(err)
		}

	} else if r.Method == "POST" {
		// Post
		file, handler, err := r.FormFile("uploadfile")

		//r.FormFile

		fmt.Println("file to be uploaded: " + handler.Filename)

		if err != nil {
			fmt.Println("Can not find the file")
			response := Exception{Message: "Can not find the file."}
			js, _ := json.Marshal(response)
			// If user's previous password has wrong value, it return 400 Bad Request.
			w.WriteHeader(http.StatusBadRequest)
			w.Header().Set("Content-Type", "application/json")
			w.Write(js)
			return
		} else {
			// If the path of the file is correct, return 200 OK.
			w.WriteHeader(http.StatusOK)
		}
		defer file.Close()

		//fmt.Fprintf(w, "%v", handler.Header)

		// create file stream
		f, err := os.OpenFile("../ImageFiles/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)

		// then call api to insert the image path to database table
		db.insertPicture("ImageFiles/" + handler.Filename)

		if err != nil {
			fmt.Println("Can not copy the file")
			response := Exception{Message: "Can not copy the file."}
			js, _ := json.Marshal(response)
			// If user's previous password has wrong value, it return 400 Bad Request.
			w.WriteHeader(http.StatusBadRequest)
			w.Header().Set("Content-Type", "application/json")
			w.Write(js)
			return
		} else {
			// If copy the file success, return 200 OK.
			w.WriteHeader(http.StatusOK)
		}
		defer f.Close()

		// copy files to server
		io.Copy(f, file)

	} else {
		fmt.Println("Unknown HTTP " + r.Method + "  Method")
	}
}
