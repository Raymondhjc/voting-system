// This file implement database input output

package main

import (
  "database/sql"
  "fmt"
  _ "github.com/go-sql-driver/mysql"
)

// database structure.
type MyDB struct {
  *sql.DB
}

// The actual database.
var db MyDB

// Connect database.
func (db *MyDB) connectDB(username string, password string, address string, dbName string) error {

  var dataSourceName = fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8", username, password, address, dbName)
  db.DB, err = sql.Open("mysql", dataSourceName)

  if err != nil {
    return err
  }

  err = db.Ping()

  if err != nil {
    return err
  }

  if verbose {
    fmt.Println("Database server connected!")
    err = db.printTables()
    if err != nil {
      return err
    }
  }

  return nil
}

//
func (db *MyDB) printTables() error {
  rows, err := db.Query(`SHOW tables`)
  if err != nil {
    return err
  }
  var s, name string
  s = "Printing tables:\n"
  for rows.Next() {
    err = rows.Scan(&name)
    if err != nil {
      return err
    }
    s += name + "\n"
  }
  s += "----------END\n"
  fmt.Print(s)
  return nil
}

func (db *MyDB) getUserHash(username string) (string, error) {
  var hash string
  var s = fmt.Sprintf(
    `SELECT passwordHash FROM votingsystem.users WHERE username = "%s";`, username)
  rows, err := db.Query(s)
  if err != nil {
    return "", err
  }

  if rows.Next() {
    err = rows.Scan(&hash)
    if err != nil {
      return "", err
    }
    return hash, nil
  } else {
    return "", nil
  }
}

func (db *MyDB) insertUserCredential(Info RegistrationInfo) error {
  hash, err := HashPassword(Info.Password)
  if err != nil {
    return err
  }

  s := fmt.Sprintf(
    `INSERT INTO votingsystem.users (username, passwordHash, lastSignin) VALUE ('%s', '%s', now());`,
    Info.Username, hash)

  stmt, err := db.Prepare(s)
  if err != nil {
    return err
  }

  _, err = stmt.Exec();
  if err != nil {
    return err
  }

  if verbose {
    fmt.Println("User crediential inserted.")
  }
  return nil
}

func (db *MyDB) insertUserInfo(Info RegistrationInfo) error {
  var s = fmt.Sprintf(
    `INSERT INTO votingsystem.userinfo (username, firstname, lastname, email, UFID, administrator)
VALUE ('%s','%s','%s','%s',%s,FALSE);`,
    Info.Username, Info.FirstName, Info.LastName, Info.Email, Info.Ufid)



  stmt, err := db.Prepare(s)
  if err != nil {
    return err
  }

  _, err = stmt.Exec();
  if err != nil {
    return err
  }

  if verbose {
    fmt.Println("User information inserted.")
  }
  return nil
}

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

func (db MyDB) ifExistDeleteUser(username string) (bool, error) {

  credentialExist, err := db.userCredentialIsExist(username)
  if err != nil {
    return false, err
  }
  infoExist, err := db.userInfoIsExist(username)

  if !credentialExist && !infoExist {
    return false, nil
  }

  if credentialExist {
    q := fmt.Sprintf(`DELETE FROM votingsystem.users WHERE username = '%s';`, username)
    _, err = db.Query(q)
    if err != nil {
      return false, err
    }
  }

  if infoExist {
    q := fmt.Sprintf(`DELETE FROM votingsystem.userinfo WHERE username = '%s';`, username)
    _, err = db.Query(q)
    if err != nil {
      return false, err
    }
  }

  return true, nil
}

func (db MyDB) userCredentialIsExist(username string) (bool, error) {
  q := fmt.Sprintf(`SELECT username FROM votingsystem.users WHERE username = '%s';`, username)
  rows, err := db.Query(q)
  if err != nil {
    return false, err
  }
  return rows.Next(), nil
}

func (db MyDB) userInfoIsExist(username string) (bool, error) {
  q := fmt.Sprintf(`SELECT username FROM votingsystem.userinfo WHERE username = '%s';`, username)
  rows, err := db.Query(q)
  if err != nil {
    return false, err
  }
  return rows.Next(), nil
}

func (db MyDB) updatePasswordHash(username string, hash string) (bool, error) {
  q := fmt.Sprintf(`UPDATE votingsystem.users SET passwordHash = "%s" WHERE username = "%s";`, hash, username)
  _, err := db.Query(q)
  if err != nil {
    return false, err
  }
  return true, nil
}

func (db MyDB) updateEmail(username string, email string) (bool, error) {
  q := fmt.Sprintf(`UPDATE votingsystem.userInfo SET email = "%s" WHERE username = "%s";`, email, username)
  _, err := db.Query(q)
  if err != nil {
    return false, err
  }
  return true, nil
}

func (db MyDB) disconnectDB() error {
  return db.Close()
}
