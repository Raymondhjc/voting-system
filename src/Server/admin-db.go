package main

import (
	"fmt"
	//"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func (db *MyDB) getElectionList(admin string) ([]election, error) {
	// Declaration
	var electionList []election
	
	  // prepare SQL statement.
	  var s = fmt.Sprintf(`SELECT * FROM votingsystem.elections WHERE admin = %s`, admin)
	
	  rows, err := db.Query(s)
	  if err != nil {
		return electionList, err
	  }
	  for i := 0; rows.Next(); i++ {
		// Fill the response here.
		election := electionList[i]
		election.admin = admin
		err = rows.Scan(&election.electionName, &election.startDate, &election.endDate, &election.scanner, &election.inspector)
	
		// Error handling
		if err != nil {
		  return electionList, err
		}
	
	  }
	
	  // If no error, return user info.
	  return electionList, nil
}
