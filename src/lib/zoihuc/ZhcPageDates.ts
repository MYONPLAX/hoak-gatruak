export default class PageDates {
  create: Date;
  update: Date;

  constructor(create: string, update: string) {
    this.create = new Date(create);
    this.update = new Date(update);
  }
}
