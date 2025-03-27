import type IntfZhcReference from '../interfaces/IntfZhcReference';

export default class ClsZhcReferenceList {
  index: number = 0;
  constructor(public references: IntfZhcReference[]) {}

  public searchIndex = (key: string): number =>
    this.references.findIndex((reference) => key === reference.key);
}
