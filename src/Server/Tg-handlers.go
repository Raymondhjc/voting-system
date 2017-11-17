package main

"fmt"

func getImage(w http.ResponseWriter, r *http.Request) {
	imageId := mux.Vars(r)["imageId"]
	exist, err := db.userCredentialIsExist(imageId)

	file := readBytes(r)
	var t Pictures
	json.Unmarshal(file, &t)


	match := CheckPasswordHash(t.PictureId, t.PictureAddress)
	if match {
		response := getImage{jstGetId(t.PictureId), jstGetAddress(t.Username)}
		js, _ := json.Marshal(response)
		//w.Header().Set("Content-Type", "application/json")
		w.Write(js)

	} else {
		response := Exception{Message: "Picture does not exist."}
		js, _ := json.Marshal(response)
		w.WriteHeader(http.StatusBadRequest)
		// w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}

}

