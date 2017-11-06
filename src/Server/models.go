package main

type SigninInfo struct {
	Username string
	Password string
}

type SigninResponse struct {
	Success  bool
	Username string
	JWT      string
}

type RegistrationInfo struct {
	FirstName string
	LastName  string
	Username  string
	Password  string
	Email     string
	Ufid      string
}

type JwtClaims struct {
	iss string
	usr string
	exp int64
	rol string
}