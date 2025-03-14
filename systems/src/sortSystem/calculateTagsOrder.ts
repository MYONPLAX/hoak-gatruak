import type { TagsDefinition } from '../common/commonInit.js';
import { printResult } from '../common/messageFormat.js';

/**
 * Search root tag which does not have any parents
 * @param tagsDef Tags definition
 * @returns first root node or undefined
 */
function searchRootTag(tagsDef: TagsDefinition): string | undefined {
  for (const tagName in tagsDef) {
    // Tag which does not have any parent
    if (tagsDef[tagName].primaryParent === undefined) return tagName;
  }
}

/**
 * Calculate tags order
 * @param tagsDef Tags definition
 * @returns Sorted tags order
 */
export function calculateTagsOrder(tagsDef: TagsDefinition): Set<string> {
  const tagsOrder = new Set<string>(); // Tag order

  const rootTagName = searchRootTag(tagsDef); // Search root tag

  if (!rootTagName) {
    // rootTag is not exist
    printResult.warning('Root tag does not exist.');
    return tagsOrder;
  }

  tagsOrder.add(rootTagName); // Register root tag name to Tag Order

  const rootTag = tagsDef[rootTagName]; // Get root tag data

  // Add children tags from root by recursive
  rootTag.registerChildrenToOrder(rootTagName, tagsOrder, tagsDef);

  return tagsOrder;
}
