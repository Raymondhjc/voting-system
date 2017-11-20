package main

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func (db *MyDB) getUserInfo(username string) (UserInfo, error) {
	// Declaration
	var userInfo UserInfo

	// prepare SQL statement.
	var s = fmt.Sprintf(
		`SELECT firstname, lastname, email, ufid FROM votingsystem.userInfo WHERE username = '%s'`, username)

	rows, err := db.Query(s)
	if err != nil {
		return userInfo, err
	}
	if rows.Next() {
		// Fill the response here.
		userInfo.Username = username
		err = rows.Scan(&userInfo.FirstName, &userInfo.LastName, &userInfo.Email, &userInfo.Ufid)

		// Error handling
		if err != nil {
			return userInfo, err
		}

	}

	// If no error, return user info.
	return userInfo, nil
}
