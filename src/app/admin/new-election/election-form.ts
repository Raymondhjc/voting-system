export class ElectionForm {
    name: string;
    startDate: string;
    endDate: string;
    sections: Section[];
}
export class Section {
    sectionName: string;
    choiceType: number;
    options: string[];
}