import type IntfZhcFootnote from '../interfaces/IntfZhcFootnote';

export default class ClsZhcFootnoteList {
  index: number = 0;
  constructor(public footnotes: IntfZhcFootnote[]) {}

  public searchIndex = (key: string): number =>
    this.footnotes.findIndex((footnote) => key === footnote.key);
}
