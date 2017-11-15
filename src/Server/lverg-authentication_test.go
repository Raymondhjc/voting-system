package main

import "testing"

func TestJstAssignerAndValidate(t *testing.T) {
  initKeys()

  if privateKey == nil {
    t.Error("Private key is not loaded")
  }

  if publicKey == nil {
    t.Error("Public key is not loaded")
  }

  token := jstAssigner("testUsername")

  if token == "" {
    t.Error("token is empty")
  }
}
