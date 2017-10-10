package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var err error

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func connectDB() {
	var username = "ufse"
	var password = "voting-system"
	var address = "127.0.0.1:3306"
	var dbName = "votingsystem"

	var dataSourceName = fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8", username, password, address, dbName)
	db, err = sql.Open("mysql", dataSourceName)
	check(err)

	err = db.Ping()
	check(err)

	check(err)

	if verbose {
		fmt.Println("Database server connected!")
		printTables()
	}

}

func printTables() {
	rows, err := db.Query(`SHOW tables`)
	check(err)

	var s, name string
	s = "Printing tables:\n"
	for rows.Next() {
		err = rows.Scan(&name)
		check(err)
		s += name + "\n"
	}
	s += "----------END\n"
	fmt.Print(s)
}

func getUserHash(username string) string {
	hash := "";
	var s = fmt.Sprintf(
		`SELECT passwordHash FROM votingsystem.users WHERE username = "%s";`, username)
	rows, err := db.Query(s)
	check(err)
	if rows.Next() {
		err = rows.Scan(&hash)
		check(err)
	}

	return hash
}

func insertUserCredential() bool {
	return true
}

func insertUserInfo() bool {
	return true
}

func registrate(Info RegistrationInfo) bool {

	if getUserHash(Info.Username) != "" {
		return false
	}

	hash, err := HashPassword(Info.Password)
	check(err)
	if verbose {
		fmt.Sprintln("Username: %s\nHash: %s", Info.Username, hash)
	}

	var s = fmt.Sprintf(
		`INSERT INTO votingsystem.users (username, passwordHash, lastSignin) VALUE ('%s', '%s', now());`,
		Info.Username, hash)

	stmt, err := db.Prepare(s)
	check(err)

	r, err := stmt.Exec();
	check(err)

	n, err := r.RowsAffected()

	if verbose {
		fmt.Println("User crediential inserted. Row affected: ", n)
	}

	return true;
}

func disconnectDB() {
	db.Close()
}
