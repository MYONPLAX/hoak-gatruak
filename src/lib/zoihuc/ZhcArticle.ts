import { baseURL, UNDEFINED } from './initZhc';
import { isStringsEmpty, isTextEmpty } from '../common/processString';
import type IntfFrontmatter from './IntfZhcFrontmatter';

export default class ZhcArticle {
  frontmatter: IntfFrontmatter;
  link: string;

  constructor(fmatter: IntfFrontmatter, slug: string) {
    this.frontmatter = {
      title: isTextEmpty(fmatter.title) ? UNDEFINED.TITLE : fmatter.title,
      pageDates: fmatter.pageDates,
      description: fmatter.description,
      tags: isStringsEmpty(fmatter.tags) ? [UNDEFINED.TAG_NAME] : fmatter.tags,
    };
    this.link = `${baseURL}zoihuc/${slug}`;
  }
}
