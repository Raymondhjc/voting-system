package main

type DataRequestInfo struct {
	ElectionID int
	QuestionID int
}

type DataOfQuestion struct {
	ID    int
	Name  string
	Votes [3]int //total , sure, unsure
}
type Answer struct {
	QuestionID int
	AnswerID   []int
}
type DataChange struct {
	BallotID   int
	ElectionID int
	Answers    []string
}
type ElectionID struct {
	ElectionID int
}
