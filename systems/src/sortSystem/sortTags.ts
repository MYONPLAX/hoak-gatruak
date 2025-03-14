import { fmtName, printResult } from '../common/messageFormat.js';
import type IntfTagsDefinitionData from './interfaces/IntfTagsDefinitionData.js';

/**
 * Sort all tags for article based on tags order
 * @param title Article title: `string`
 * @param tagList All tags for article: `string[]`
 * @param tagsDefData `tagsDef`: `TagsDefinition` and `tagsOrder`: `Set<string>`
 * @returns Sorted tags: `string[]`
 */
export function sortTags(
  title: string,
  tagList: string[],
  tagsDefData: IntfTagsDefinitionData
): string[] {
  // Alias to tagsDefData properties
  const tagsDef = tagsDefData.tagsDef;
  const tagsOrder = tagsDefData.tagsOrder;

  const allTagList = new Set<string>(); // All tags for article

  // Does Tag in `tagList` exist in `tagsDef`
  tagList.forEach((tagName) => {
    // selectedTag is exist in tags order
    if (!tagsOrder.has(tagName)) {
      // Tag does not exist in tags order
      printResult.warning(`Article title: ${title}`);
      printResult.warning(`Tag: ${fmtName('tag', tagName)} is not defined.`);
      return;
    }

    // Search all parents recursive and collect them
    tagsDef[tagName].collectParents(tagName, allTagList, tagsDef);
  });

  const sortedTagList = new Set<string>(); // Sorted allTagList

  // Sort `tagList`
  tagsOrder.forEach((tag) => {
    // If the tag is exist and not virtual, then add to `sortedTagList`
    if (allTagList.has(tag) && !tagsDef[tag].virtual) sortedTagList.add(tag);
  });

  return [...sortedTagList]; // Convert `sortedTagList` from `Set<string>` to `string[]`
}
