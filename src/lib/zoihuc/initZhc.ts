import murmurhash from 'murmurhash';
import type { AstroInstance } from 'astro';
import type IntfZhcFrontmatter from './IntfZhcFrontmatter';

export type ArticleObject = [
  string,
  AstroInstance & { frontmatter: IntfZhcFrontmatter },
];

export const baseURL = import.meta.env.BASE_URL;

// Default names for undefined
export const UNDEFINED = {
  TITLE: '無題',
  TAG_NAME: 'その他',
} as const;

/**
 * Calculate hash by murmurhash v3 and convert it to string
 * @param tag tag name
 * @returns Generated hash from tag (as string)
 */
export const generateTagHash = (tag: string) => murmurhash.v3(tag).toString();
