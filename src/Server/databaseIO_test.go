package main

import (
	"testing"
)

var testusername = "ufse"
var testpassword = "voting-system"
var testaddress = "127.0.0.1:3306"
var testdbName = "votingsystem"

func TestHashPassword(t *testing.T) {
	hash, err := HashPassword("abcdefg")
	if err != nil {
		t.Error("Error when hashing password")
	}
	if len(hash) != 60 {
		t.Error("The length of hash is wrong.")
	}
}

func TestCheckPasswordHash(t *testing.T) {
	hash, err := HashPassword("the correct password")
	if err != nil {
		t.Error("Error when hashing password")
	}
	if !CheckPasswordHash("the correct password", hash) {
		t.Error("The correct password does not passed the test.")
	}
	if CheckPasswordHash("the wrong password", hash) {
		t.Error("a wrong password passed the test.")
	}
}

func TestConnectandDisconnectDb(t *testing.T) {

	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	if err != nil {
		t.Error("something went wrong when connecting database")
	}
	err = db.disconnectDB()
	if err != nil {
		t.Error("something went wrong when disconnecting database")
	}
}

func TestUserCredentialIsExist(t *testing.T) {
	verbose = false
	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()

	_, err := db.userCredentialIsExist("testUsername")
	if err != nil {
		t.Error("error when query user existance")
	}
}

func TestIfExistDeleteUser(t *testing.T) {
	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()
	_, err = db.ifExistDeleteUser("testUsername")
	if err != nil {
		t.Error("error in ifExistDeleteUser", err)
	}
}

func TestRegistrate(t *testing.T) {

	info := RegistrationInfo{"testFirstname", "testLastname", "testUsername",
		"testPassword", "test@Email.com", "12345678"}

	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()
	db.ifExistDeleteUser("testUsername")

	success, err := registrate(info)
	if err != nil {
		t.Error("Error during registration:", err)
	} else if !success {
		t.Error("can not registrate new username.")
	}

	success, err = registrate(info)
	if err != nil {
		t.Error("Error during registration:", err)
	} else if success {
		t.Error("able to registrate using duplicated name")
	}
}
