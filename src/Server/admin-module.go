package main

type Election struct {
	ElectionID   string
	ElectionName string
	StartDate    string
	EndDate      string
	Count        int
	Status       int
	Sections     []Section
	Admin        string
	Scanner      string
	Inspector    string
}

type Section struct {
	SectionID   string
	SectionName string
	ChoiceType  int
	Options     []Option
}

type Option struct {
	OptionID string
	Label    string
	Count    int
}
