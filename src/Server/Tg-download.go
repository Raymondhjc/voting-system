package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var pictures []Picture

func getVotingImagesHandler(w http.ResponseWriter, r *http.Request) {
	pictures, _ = db.getPictures()

	//Convert the pictures variable to json
	pictureListBytes, err := json.Marshal(pictures)

	// If there is an error, print it to the console, and return a server
	// error response to the user
	if err != nil {
		fmt.Println(fmt.Errorf("Error: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// debug only
	fmt.Println(pictureListBytes)

	// If all goes well, write the JSON list of pictures to the response
	w.WriteHeader(http.StatusOK)
	w.Write(pictureListBytes)
}
