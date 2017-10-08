package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB
var err error

func connectDB() {
	db, err = sql.Open("mysql", "ufse:voting-system@tcp(127.0.0.1:3306)/votingsystem?charset=utf8")
	defer db.Close()

	err = db.Ping()

	if err != nil {
		fmt.Println(err)
	}
}

func inser(){

}