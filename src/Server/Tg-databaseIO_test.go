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

func TestInsertPicture(t *testing.T) {

	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()

	_, err = db.insertPicture("ImageFiles/image01.jpg")
	if err != nil {
		t.Error("error in insertPicture", err)
	}
}
