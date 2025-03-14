import type { TagsDefinition } from '../../common/commonInit.js';

export default interface IntfTagsDefinitionData {
  tagsDef: TagsDefinition;
  tagsOrder: Set<string>;
}
