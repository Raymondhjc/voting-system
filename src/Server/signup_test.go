package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"encoding/json"
	"bytes"
)

func TestSignupHandler(t *testing.T) {
	// setup
	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()
	initKeys()

	registrationInfo := RegistrationInfo{
		"testFirstname",
		"testLastname",
		"testUsername",
		"testPassword",
		"test@email.com",
		"12345678",
	}

	body, err := json.Marshal(registrationInfo)
	check(err)

	req, err := http.NewRequest("POST", "localhost:4500/signup", bytes.NewReader(body))
	check(err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(signupHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK && status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	//// Check the response body is what we expect.
	//expected := `{"alive": true}`
	//if rr.Body.String() != expected {
	//	t.Errorf("handler returned unexpected body: got %v want %v",
	//		rr.Body.String(), expected)
	//}

}

func TestUserExistHandler(t *testing.T) {
	// setup
	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()

	req, err := http.NewRequest("GET", "localhost:4500/signup", nil)
	check(err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(userExistHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	//// Check the response body is what we expect.
	//expected := `{"alive": true}`
	//if rr.Body.String() != expected {
	//	t.Errorf("handler returned unexpected body: got %v want %v",
	//		rr.Body.String(), expected)
	//}

}
