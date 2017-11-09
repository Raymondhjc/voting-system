package main

import (
	"fmt"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

type Picture struct {
	PictureId      int    `json:"pictureid"`
	PictureAddress string `json:"pictureaddress"`
}

type Pictures []Picture

func (db *MyDB) getPictures(pictureId int) (pictures Pictures, err error) {
	// Declaration

	// prepare SQL statement.
	var s = fmt.Sprintf(
		`SELECT pictureAddress FROM votingsystem.pictures WHERE pictureId = %s`, pictureId)

	rows, err := db.Query(s)
	if err != nil {
		//if the picture does not exist add wrong massage to frontend
		return pictures, err
	} else{
		//return the picture 
	}
	for rows.Next() {
		// Fill the response here.
		var picture Picture
		err = rows.Scan(&picture.PictureId, &picture.PictureAddress)

		// Error handling
		if err != nil {
			return pictures, err
		}

		fmt.Println("Id: " + strconv.Itoa(picture.PictureId) + ", Address: " + picture.PictureAddress)

		pictures = append(pictures, picture)

	}

	// If no error, return list of pictures
	return pictures, nil
}

func (db MyDB) imageIdIsExist(username string) (bool, error) {
	q := fmt.Sprintf(`SELECT username FROM votingsystem.users WHERE username = '%s';`, username)
	rows, err := db.Query(q)
	if err != nil {
	  return false, err
	}
	return rows.Next(), nil
  }
