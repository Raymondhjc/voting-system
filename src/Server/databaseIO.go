package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB
var err error

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

func registrate(Info RegistrationInfo) {

}

func disconnectDB() {
	db.Close()
}
