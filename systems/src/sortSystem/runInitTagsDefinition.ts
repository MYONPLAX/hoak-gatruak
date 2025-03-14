import { printResult } from '../common/messageFormat.js';
import { initTagsDefinition } from './initTagsDefinition.js';

export function runInitTagsDefinition(): void {
  const tagsDefData = initTagsDefinition();

  if (!tagsDefData) {
    printResult.warning('Initalise tags definition is failed.');
    return;
  }

  printResult.success('Init tags definition is done.');
  return;
}

runInitTagsDefinition();
