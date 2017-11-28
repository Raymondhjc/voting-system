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

func (db *MyDB) getPictures() (pictures Pictures, err error) {
	// Declaration

	// prepare SQL statement.
	rows, err := db.Query("SELECT pictureId, pictureAddress FROM votingsystem.pictures")

	if err != nil {
		//if the picture does not exist add wrong massage to frontend
		fmt.Println(err)
		return pictures, err
	} else {
		//return the picture
	}
	for rows.Next() {
		// Fill the response here.
		var picture Picture
		err = rows.Scan(&picture.PictureId, &picture.PictureAddress)

		// Error handling
		if err != nil {
			fmt.Println(err)
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

func (db *MyDB) insertPicture(pictureAddress string) (bool, error) {
	// Declaration

	// insert
	stmt, err := db.Prepare("insert into votingsystem.pictures (pictureAddress) values (?)")
	if err != nil {
		return false, err
	}

	res, err := stmt.Exec(pictureAddress)
	if err != nil {
		return false, err
	}

	id, err := res.LastInsertId()

	fmt.Print(id)

	// If no error, return list of pictures
	return true, nil
}
