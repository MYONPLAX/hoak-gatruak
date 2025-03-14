import murmurhash from 'murmurhash';
import type TagComponent from '../sortSystem/classes/TagComponent.js';

export const FILES = {
  TAGS_DEF: 'tagDefinitions.json',
  TAGS_DEF_DATA: 'tagDefinitionData.json',
  TAGS_ORDER: 'tagsOrder.json',
  TAGS_GRAPH: 'tagsGraph.html',
} as const;

export const DIRS = {
  DEF: 'systems',
  DATA: 'data',
  SRC: 'src',
  PAGES: 'pages',
  TAG_PAGES: 'tags',
  TAGS_GRAPH: 'tagsGraph',
} as const;

export const PATHS = {
  DATA: DIRS.DATA,
  PAGES: `${DIRS.SRC}/${DIRS.PAGES}`,
  TAGS_PAGES: `${DIRS.SRC}/${DIRS.PAGES}/${DIRS.TAG_PAGES}`,
  TAGS_DEF: `${DIRS.DEF}/${FILES.TAGS_DEF}`,
  TAGS_DEF_DATA: `${DIRS.DATA}/${FILES.TAGS_DEF_DATA}`,
  TAGS_ORDER: `${DIRS.DATA}/${FILES.TAGS_ORDER}`,
  TAGS_GRAPH: `${DIRS.TAGS_GRAPH}/${FILES.TAGS_GRAPH}`,
} as const;

// Defined type
export type TagsDefinition = Record<string, TagComponent>;

/**
 * Calculate hash by murmurhash v3 and convert it to string
 * @param tag tag name
 * @returns Generated hash from tag (as string)
 */
export const generateTagHash = (tag: string) => murmurhash.v3(tag).toString();
