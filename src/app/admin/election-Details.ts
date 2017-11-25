export class ElectionDetails {
  id: string;
  name: string;
  count: number;
  status: string;

  constructor(id: string, name: string, count: number, number: string) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.status = number;
  }
}