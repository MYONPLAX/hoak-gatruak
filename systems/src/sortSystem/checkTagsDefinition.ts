import { validateTagComponent } from './interfaces/validateTagComponent.js';
import { fmtName, printResult } from '../common/messageFormat.js';
import TagComponent from './classes/TagComponent.js';
import { type TagsDefinition } from '../common/commonInit.js';
import type IntfTagComponent from './interfaces/IntfTagComponent.js';

/**
 * Check tags definition object and convert it to `TagsDefinition`
 * @param tagsDefObject Tags definition object: `any`
 * @param debug Debug flag for print message
 * @returns Tags definition data: `TagsDefinition | null`
 */
export function checkTagsDefinition(
  tagsDefObject: any,
  debug: boolean
): TagsDefinition | null {
  // Convert `tagsDefObject: any` to `tagsDef: TagsDefinition
  const tagsDef: TagsDefinition = {};

  for (const tagName in tagsDefObject) {
    const tagComponent = tagsDefObject[tagName];

    // Validate tagComponent as IntfTagComponent
    const errorMessage = validateTagComponent(tagComponent);

    if (errorMessage) {
      // `tagComponent` is invalid
      printResult.error(`Tag ${fmtName('tag', tagName)}: ${errorMessage}`);
      return null;
    }

    // `tagComponent` is valid, convert Interface `IntfTagComponent` to class `TagComponent`
    tagsDef[tagName] = new TagComponent(tagComponent as IntfTagComponent);
  }

  for (const tagName in tagsDef) {
    // Validate Parent-child relationship
    const validRelationships = tagsDef[tagName].validateParentChildRelations(
      tagName,
      tagsDef,
      debug
    );

    if (!validRelationships) {
      // `parent-child` relaltionship is invalid
      printResult.error('Invalid tag parent-child relation is detected.');
      return null;
    }
  }

  if (debug) printResult.success('Tags definition is valid.');
  return tagsDef;
}
