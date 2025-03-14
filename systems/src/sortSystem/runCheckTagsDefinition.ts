import { printResult } from '../common/messageFormat.js';
import { initTagsDefinition } from './initTagsDefinition.js';

export function runCheckTagsDefinition(): void {
  const tagsDefData = initTagsDefinition();

  if (!tagsDefData) {
    printResult.warning('Initalise tags definition is failed.');
    return;
  }

  printResult.info('📗', 'TAGS DEFINITION');
  console.log(`${JSON.stringify(tagsDefData.tagsDef, null, 2)}\n`);

  printResult.info('📗', 'TAGS ORDER');
  console.log(`[${[...tagsDefData.tagsOrder]}]\n`);

  printResult.success('Check tags definition is done.');
  return;
}

runCheckTagsDefinition();
