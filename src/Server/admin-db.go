package main

import (
	"fmt"
	//"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// func (db *MyDB) getElectionList(admin string) (*list, error) {
// 	// Declaration
// 	electionList := list.New()

// 	// prepare SQL statement.
// 	var s = fmt.Sprintf(`SELECT name FROM votingsystem.elections WHERE admin = %s`, admin)

// 	rows, err := db.Query(s)
// 	if err != nil {
// 		return electionList, err
// 	}
// 	for i := 0; rows.Next(); i++ {
// 		// Fill the response here.
// 		// election := electionList[i]
// 		// election.admin = admin
// 		//election.electionName = admin
// 		var election election
// 		err = rows.Scan(&election.electionName) //, &election.startDate, &election.endDate, &election.scanner, &election.inspector
// 		electionList.PushBack(election)
// 		// Error handling
// 		if err != nil {
// 			return electionList, err
// 		}

// 	}

// 	// If no error, return user info.
// 	return electionList, nil
// }
func (db *MyDB) getElectionList(admin string) ([]Election, error) {
	// Declaration
	var electionList []Election

	// prepare SQL statement.
	var s = fmt.Sprintf(`SELECT id, name, startDate, endDate, count, status FROM votingsystem.elections WHERE admin = %s`, admin)

	rows, err := db.Query(s)
	if err != nil {
		return electionList, err
	}
	for i := 0; rows.Next(); i++ {
		var ele Election
		err = rows.Scan(&ele.ElectionID, &ele.ElectionName, &ele.StartDate, &ele.EndDate, &ele.Count, &ele.Status)
		electionList = append(electionList, ele)
		fmt.Print(electionList)
		// Error handling
		if err != nil {
			return electionList, err
		}

	}

	// If no error, return user info.
	return electionList, nil
}
