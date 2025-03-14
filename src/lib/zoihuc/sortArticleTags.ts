import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { UNDEFINED } from './initZhc';
import { PATHS } from 'systems/src/common/commonInit';
import { initTagsDefinition } from 'systems/src/sortSystem/initTagsDefinition';
import { checkTagsDefinition } from 'systems/src/sortSystem/checkTagsDefinition';
import { sortTags } from 'systems/src/sortSystem/sortTags';
import { printRead, printResult } from 'systems/src/common/messageFormat';

/**
 * Sort article tags
 * @param tags Tag list which before sort `string[]`
 * @returns Sorted tag list `string[]`
 */
export async function sortArticleTags(tags: string[]): Promise<string[]> {
  // Tag is empty
  if (tags.length === 0) {
    tags.push(UNDEFINED.TAG_NAME);
  }

  // Whether tags definition files are exist or not
  if (!(existsSync(PATHS.TAGS_DEF_DATA) && existsSync(PATHS.TAGS_ORDER))) {
    initTagsDefinition(); // Generate tags order file
  }

  // Read tags definition file
  let tagsDefData: any;

  try {
    tagsDefData = await readFile(PATHS.TAGS_DEF_DATA, 'utf-8');
  } catch (error) {
    printRead.fileError(PATHS.TAGS_DEF_DATA, error);
    return tags;
  }

  const tagsDef = checkTagsDefinition(JSON.parse(tagsDefData), false);

  if (!tagsDef) {
    printResult.error('Tags definition is invalid.');
    return tags;
  }

  // Read tags order file
  let tagsOrder: string[];

  try {
    const tagsOrderData = await readFile(PATHS.TAGS_ORDER, 'utf-8');
    tagsOrder = JSON.parse(tagsOrderData);
  } catch (error) {
    printRead.fileError(PATHS.TAGS_ORDER, error);
    return tags;
  }

  // Calculate order
  const sortedTag: string[] = sortTags('', tags, {
    tagsDef,
    tagsOrder: new Set<string>(tagsOrder),
  });
  return sortedTag;
}
