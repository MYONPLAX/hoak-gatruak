import { styleText } from 'node:util';

type NameType = 'type' | 'prop' | 'tag' | 'relation' | 'file';

const coloringName = (type: NameType, text: string) => {
  switch (type) {
    case 'type':
      return `${styleText('green', text)}`;
    case 'prop':
      return `${styleText('magenta', text)}`;
    case 'tag':
      return `${styleText('blue', text)}`;
    case 'relation':
      return `${styleText('yellow', text)}`;
    case 'file':
      return `${styleText('white', text)}`;
    default:
      return `${styleText('reset', text)}`;
  }
};

// Format name
export const fmtName = (type: NameType, text: string) =>
  styleText('bold', `"${coloringName(type, text)}"`);

// Basic messages `error`, `warning`, `success`, `info`
export const printResult = {
  error: (text: unknown) =>
    console.error(`${styleText('red', '❌[ERROR]')} ${text}`),

  warning: (text: string) =>
    console.error(`${styleText('yellow', '❕[WARN]')} ${text}`),

  success: (text: string) =>
    console.log(`${styleText('green', '✅[INFO]')} ${text}\n`),

  info: (icon: string, text: string) => console.log(`${icon}[INFO] ${text}`),
} as const;

// Make file and Directory (generate file, create directory)
export const printMakeFD = {
  // Generate file
  fileSuccess: (file: string) =>
    printResult.info('📄', `${fmtName('file', file)} is generated.`),

  fileFailed: (file: string, error: unknown) =>
    printResult.error(`Failed to generate ${fmtName('file', file)}: ${error}`),

  // Create directory
  dirSuccess: (dir: string) =>
    printResult.info('📁', `${fmtName('file', `${dir}/`)} is created.`),

  dirFailed: (dir: string, error: unknown) =>
    printResult.error(`Failed to create ${fmtName('file', dir)}.: ${error}`),
} as const;

// Read file
export const printRead = {
  fileError: (file: string, error: unknown) =>
    printResult.error(
      `Failed to read or parse ${fmtName('file', file)}: ${error}`
    ),
} as const;
