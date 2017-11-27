export class ElectionDetails {
    electionID: string;
    electionName: string;
    startDate: string;
    endDate: string;
    count: number;
    status: string;
    questions: Array<Question>;
    admin: string;
    inspector: string;
    scanner: string;
  
    constructor(id: string, name: string, start: string, end: string, count: number,
      status: string, admin: string, inspector: string, scanner: string, questions: Array<any>, isNew ?: boolean) {
        
          this.electionID = id;
          this.electionName = name;
          this.startDate = start;
          this.endDate = end;
          this.count = count;
          this.status = status;
          this.admin = admin;
          this.inspector = inspector;
          this.scanner = scanner;
          if (isNew == true) {
            this.questions = questions;
          }else{
            this.questions = new Array<Question>();
            for (let s of questions) {
              let newS = new Question();
              newS.questionID = s.QuestionID;
              newS.questionName = s.QuestionName;
              newS.choiceType = s.ChoiceType;
              newS.options = new Array<Option>();
              for (let o of s.Options) {
                let newO = new Option();
                newO.optionID = o.OptionID;
                newO.label = o.Label;
                newO.count = o.Count;
                newS.options.push(newO);
              }
              this.questions.push(newS);
            }
          }
        }
    }
  
  export class Question {
    questionID: string;
    questionName: string;
    choiceType: number;
    options: Array<Option>;
  }
  
  export class Option {
    optionID: string;
    label: string;
    count: number;
  }
  