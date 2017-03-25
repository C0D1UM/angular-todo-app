export class Todo {
  readonly id: number;
  readonly title: string;
  readonly complete: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
