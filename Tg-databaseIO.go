package main
/*
import (
	"fmt"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

type Picture struct {
	pictureId      int    `json:"pictureid"`
	pictureAddress string `json:"pictureaddress"`
}

type Pictures []Picture

func (db *MyDB) getPictures() (pictures Pictures, err error) {
	// Declaration

	// prepare SQL statement.
	var s = fmt.Sprintf(
		`SELECT pictureId, pictureAddress FROM votingsystem.pictures`)

	rows, err := db.Query(s)
	if err != nil {
		return pictures, err
	}
	for rows.Next() {
		// Fill the response here.
		var picture Picture
		err = rows.Scan(&picture.pictureId, &picture.pictureAddress)

		// Error handling
		if err != nil {
			return pictures, err
		}

		fmt.Println("Id: " + strconv.Itoa(picture.pictureId) + ", Address: " + picture.pictureAddress)

		pictures = append(pictures, picture)

	}

	// If no error, return list of pictures
	return pictures, nil
}
