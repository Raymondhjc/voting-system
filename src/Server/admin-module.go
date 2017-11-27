package main

import (
	"database/sql"
)

type Election struct {
	ElectionID   int
	ElectionName string
	StartDate    string
	EndDate      string
	Count        int
	Status       string
	Questions    []Question
	Admin        string
	Scanner      sql.NullString
	Inspector    sql.NullString
}

type NewElection struct {
	ElectionID   int
	ElectionName string
	StartDate    string
	EndDate      string
	Count        int
	Status       string
	Questions    []Question
	Admin        string
	Scanner      string
	Inspector    string
}

type Question struct {
	QuestionID   int
	QuestionName string
	ChoiceType   int
	Options      []Option
}

type Option struct {
	OptionID int
	Label    string
	Count    int
}
