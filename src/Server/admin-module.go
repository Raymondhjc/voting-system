package main

type election struct {
	electionName string
	startDate    string
	endDate      string
	sections     []section
	admin        string
	scanner      string
	inspector    string
}

type section struct {
	sectionID   string
	sectionName string
	choiceType  int
	options     []option
}

type option struct {
	optionID string
	label    string
	count    int
}
