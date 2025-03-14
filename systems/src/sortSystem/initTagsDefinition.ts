import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { checkTagsDefinition } from './checkTagsDefinition.js';
import { calculateTagsDepth } from './calculateTagsDepth.js';
import { calculateTagsOrder } from './calculateTagsOrder.js';
import { generateTagsGraph } from '../graphSystem/generateTagsGraph.js';
import TagGraphData from '../graphSystem/classes/TagGraphData.js';
import {
  printResult,
  printMakeFD,
  printRead,
} from '../common/messageFormat.js';
import { FILES, PATHS } from '../common/commonInit.js';
import type IntfTagsDefinitionData from './interfaces/IntfTagsDefinitionData.js';
import { resolve } from 'node:path';

/**
 * Initialise Tags definition data
 * @returns Tags definition data `TagsDefinition | null`
 */
export function initTagsDefinition(): IntfTagsDefinitionData | null {
  let tagsDefObject: any;

  // Read tags definition from file
  try {
    const tagsDefRaw = readFileSync(PATHS.TAGS_DEF, 'utf-8');
    tagsDefObject = JSON.parse(tagsDefRaw);
  } catch (error) {
    printRead.fileError(FILES.TAGS_DEF, error);
    return null;
  }

  // Validate `tagsDefObject` and Convert type `any` to `TagsDefinition`
  const tagsDef = checkTagsDefinition(tagsDefObject, true);

  // Whether `tagsDefinition` is valid
  if (!tagsDef) {
    printResult.error('Tags definition is invalid.');
    return null;
  }

  // Calculate tags depth
  if (!calculateTagsDepth(tagsDef)) {
    printResult.error('Calculate depth is failed.');
    return null;
  }

  // Make data/ directory
  const dataDir = resolve(PATHS.DATA);
  try {
    mkdirSync(dataDir, { recursive: true });
    if (!existsSync(dataDir)) printMakeFD.dirSuccess(PATHS.DATA);
  } catch (error) {
    printMakeFD.dirFailed(PATHS.DATA, error);
    return null;
  }

  // Write tags definition to file
  try {
    writeFileSync(PATHS.TAGS_DEF_DATA, JSON.stringify(tagsDef, null, 2));
    printMakeFD.fileSuccess(PATHS.TAGS_DEF_DATA);
  } catch (error) {
    printMakeFD.fileFailed(PATHS.TAGS_DEF_DATA, error);
    return null;
  }

  const tagsOrder = calculateTagsOrder(tagsDef); // Calculate tags order

  // Write tags order to file
  try {
    writeFileSync(PATHS.TAGS_ORDER, JSON.stringify([...tagsOrder], null, 2));
    printMakeFD.fileSuccess(PATHS.TAGS_ORDER);
  } catch (error) {
    printMakeFD.fileFailed(PATHS.TAGS_ORDER, error);
    return null;
  }

  const tagsGraph = generateTagsGraph(new TagGraphData(tagsDef)); // Calculate tags graph

  // Write tags graph to file
  try {
    writeFileSync(PATHS.TAGS_GRAPH, tagsGraph, 'utf-8');
    printMakeFD.fileSuccess(PATHS.TAGS_GRAPH);
  } catch (error) {
    printMakeFD.fileFailed(PATHS.TAGS_GRAPH, error);
    return null;
  }

  return { tagsDef, tagsOrder };
}
