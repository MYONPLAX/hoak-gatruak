import type PageDates from '../ZhcPageDates';

export default interface IntfZhcFrontmatter {
  title: string;
  pageDates: PageDates;
  description: string;
  tags: string[];
}
