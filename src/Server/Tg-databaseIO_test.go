package main

import (
	"testing"
)

func TestGetPictures(t *testing.T) {

	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()

	_, err = db.getPictures()
	if err != nil {
		t.Error("error in getPictures", err)
	}
}
