interface IntfContent {
  title: string;
  link: string;
  description?: string;
}

export const contentList: IntfContent[] = [
  { title: 'じゆちょう', link: '/zoihuc', description: 'なんか書いとく予定' },
  {
    title: 'BOTHER REDUN CALC',
    link: '/bother-redun-calc',
    description: 'JavaScript で作られためんどくさい電卓',
  },
];
