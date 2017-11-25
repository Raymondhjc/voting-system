package main

import (
	"database/sql"
)

type Election struct {
	ElectionID   string
	ElectionName string
	StartDate    string
	EndDate      string
	Count        int
	Status       int
	Questions    []Question
	Admin        string
	Scanner      sql.NullString
	Inspector    sql.NullString
}

type Question struct {
	QuestionID   string
	QuestionName string
	ChoiceType   int
	Options      []Option
}

type Option struct {
	OptionID string
	Label    string
	Count    int
}
