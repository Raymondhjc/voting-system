package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"encoding/json"
	"bytes"
)


func TestSigninHandler(t *testing.T) {
	// setup
	err = db.connectDB(testusername, testpassword, testaddress, testdbName)
	defer db.disconnectDB()

	signinInfo := SigninInfo{
	"testUsername",
	"testPassword",
	}

	body, err := json.Marshal(signinInfo)
	check(err)

	req, err := http.NewRequest("POST", "localhost:4500/signin", bytes.NewReader(body))
	check(err)


	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(signinHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	//// Check the response body is what we expect.
	//expected := `{"alive": true}`
	//if rr.Body.String() != expected {
	//	t.Errorf("handler returned unexpected body: got %v want %v",
	//		rr.Body.String(), expected)
	//}

}

