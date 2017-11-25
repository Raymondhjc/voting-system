export class ElectionDetails {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    count: number;
    status: string;
    questions: Array<Question>;
    admin: string;
    inspector: string;
    scanner: string;
  
    constructor(id: string, name: string, start: string, end: string, count: number,
        status: string, admin: string, inspector: string, scanner:string, Questions: Array<any>) {
      this.id = id;
      this.name = name;
      this.startDate = start;
      this.endDate = end;
      this.count = count;
      this.status = status;
      this.admin = admin;
      this.inspector = inspector;
      this.scanner = scanner;
      this.questions = new Array<Question>();
      for(let s of Questions){
          let newS = new Question();
          newS.questionID = s.QuestionID;
          newS.questionName = s.QuestionName;
          newS.choiceType = s.ChoiceType;
          newS.options = new Array<Option>();
          for(let o of s.Options){
            let newO = new Option();
            newO.optionID = o.OptionID;
            newO.label = o.Label;
            newO.count = o.Count;
            newS.options.push(newO);
          }
          this.questions.push(newS)
      }
    }
  }
  
  export class Question{
    questionID: string;
    questionName: string;
    choiceType: number;
    options: Array<Option>;
  }

  export class Option{
      optionID: string;
      label: string;
      count: number;
  }
