import type { TagsDefinition } from '../common/commonInit.js';
import { printResult } from '../common/messageFormat.js';

/**
 * Calculate tags longest path
 * @param tags // All tags key and value
 * @return // Detect cyclic dependencies
 */
export function calculateTagsDepth(tagsDef: TagsDefinition): boolean {
  const inDegree: Record<string, number> = {};
  const queue: string[] = [];
  let nodeCount = 0;

  // Initialise inDegree[]
  for (const tagName in tagsDef)
    inDegree[tagName] = tagsDef[tagName].parents.length; // parent node

  // Tag does not have parents (in degree is 0)
  for (const tagName in tagsDef)
    if (inDegree[tagName] === 0) queue.push(tagName);

  // Calculate depth by Topological sorting
  while (queue.length > 0) {
    const currentTag = queue.shift()!;
    const currentTagComponent = tagsDef[currentTag];
    const currentDepth = currentTagComponent.depth;

    ++nodeCount;

    currentTagComponent.children.forEach((child) => {
      const childTag = tagsDef[child];

      childTag.depth = Math.max(childTag.depth, currentDepth + 1);
      inDegree[child] -= 1;
      if (inDegree[child] === 0) queue.push(child);
    });
  }

  if (nodeCount !== Object.keys(tagsDef).length) {
    printResult.error('Cycle detected in the tag dependencies.');
    return false;
  }

  return true;
}
