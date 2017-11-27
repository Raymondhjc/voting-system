package main

// sign in request
type SigninInfo struct {
  Username string
  Password string
}

// sign in response
type SigninResponse struct {
  JWT string
}

// registration request
type RegistrationInfo struct {
  FirstName string
  LastName  string
  Username  string
  Password  string
  Email     string
  Ufid      string
}

// registration response
type UserInfo struct {
  Username  string
  FirstName string
  LastName  string
  Email     string
  Ufid      string
  Role      string
}

// JWT structure.
type JwtClaims struct {
  Iss string
  Usr string
  Exp int64
  Rol string
}

// If some error occur, this response will be returned.
type Exception struct {
  Message string `json:"message"`
}

// if
type ModifyPasswordRequest struct {
  Password    string `json:"password"`
  NewPassword string `json:"newPassword"`
}

type ModifyEmailRequest struct {
  NewEmail string `json:"newEmail"`
}
