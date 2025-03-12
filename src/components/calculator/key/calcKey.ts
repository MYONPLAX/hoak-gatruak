export enum CalcKeyType {
  Number,
  Symbol,
  BackSpace,
  Clear,
  Run,
}

export interface CalcKey {
  char: string;
  type: CalcKeyType;
}

export const keyList: CalcKey[][] = [
  [
    { char: '7', type: CalcKeyType.Number },
    { char: '8', type: CalcKeyType.Number },
    { char: '9', type: CalcKeyType.Number },
    { char: '/', type: CalcKeyType.Symbol },
  ],
  [
    { char: '4', type: CalcKeyType.Number },
    { char: '5', type: CalcKeyType.Number },
    { char: '6', type: CalcKeyType.Number },
    { char: '*', type: CalcKeyType.Symbol },
  ],
  [
    { char: '1', type: CalcKeyType.Number },
    { char: '2', type: CalcKeyType.Number },
    { char: '3', type: CalcKeyType.Number },
    { char: '-', type: CalcKeyType.Number },
  ],
  [
    { char: '0', type: CalcKeyType.Number },
    { char: '(', type: CalcKeyType.Number },
    { char: ')', type: CalcKeyType.Number },
    { char: '+', type: CalcKeyType.Number },
  ],
  [
    { char: 'C', type: CalcKeyType.Clear },
    { char: 'B', type: CalcKeyType.BackSpace },
    { char: '.', type: CalcKeyType.Symbol },
    { char: '=', type: CalcKeyType.Run },
  ],
];
