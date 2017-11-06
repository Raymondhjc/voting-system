package main

import "testing"

func TestJstAssigner(t *testing.T) {
	initKeys()

	if privateKey == nil {
		t.Error("Private key is not loaded")
	}

	if publicKey == nil {
		t.Error("Public key is not loaded")
	}

}
