interface IntfContent {
  title: string;
  link: string;
  description?: string;
}

export const contentList: IntfContent[] = [
  { title: 'おどうぐ箱', link: '/ogdro', description: 'なんかつかえそう' },
  { title: 'じゆちょう', link: '/zoihuc', description: 'なんか書いとく予定' },
];

export const contentOgdro: IntfContent[] = [
  {
    title: 'BOTHER REDUN CALC',
    link: '/ogdro/bother-redun-calc',
    description: 'TypeScript で作られためんどくさい電卓',
  },
];
