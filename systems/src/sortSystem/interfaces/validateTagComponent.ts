import { fmtName } from '../../common/messageFormat.js';

/**
 * Check type of `tagComponent` and its properties comform to `IntfTagComponent`
 * @param tagComponent: `any`
 * @returns Error message or nothing: `string | null`
 */
export function validateTagComponent(tagComponent: any): string | null {
  // Warning messages
  const warnProp = (name: string, type: string, prop: any) =>
    `Property ${fmtName('prop', name)} must be a ${fmtName('type', type)}. Current type: ${fmtName('type', typeof prop)}.`;

  const warnArray = (name: string, prop: any) =>
    `Property ${fmtName('prop', name)} must be an array of ${fmtName('type', 'strings')}. Current type: ${fmtName('type', typeof prop)}.`;

  const warnItem = (arrayName: string, prop: any) =>
    `All elements in ${fmtName('prop', arrayName)} must be ${fmtName('type', 'strings')}. Current type: ${fmtName('type', typeof prop)}.`;

  /**
   * Check property type
   * @param prop property
   * @param type type (`string`, `boolean`, `object`)
   * @returns
   */
  const checkType = (prop: any, type: string) => typeof prop === type;

  // Define `checkType()` by propery type
  const isString = (prop: any) => checkType(prop, 'string');
  const isBoolean = (prop: any) => checkType(prop, 'boolean');
  const isObject = (prop: any) => prop !== null && checkType(prop, 'object');

  // Whether the property is defined or not
  const isDefined = (prop: any) => prop !== undefined;

  // Validate properties

  // The `tagComponent` is defined and not null
  if (!isObject(tagComponent)) {
    return `Object is ${fmtName('type', 'null')} or ${fmtName('type', 'undefined')}`;
  }

  // `tagComponent.parents` is `undefined` or `Array`
  if (isDefined(tagComponent.parents) && !Array.isArray(tagComponent.parents)) {
    return warnArray('parents', tagComponent.parents);
  }

  // `tagComponent.parents` is `undefined` or `string[]`
  if (
    isDefined(tagComponent.parent) &&
    !tagComponent.parents.every((parent: string) => isString(parent))
  ) {
    return warnItem('parents', tagComponent.parents);
  }

  // `tagComponent.children` is `undefined` or `Array`
  if (
    isDefined(tagComponent.children) &&
    !Array.isArray(tagComponent.children)
  ) {
    return warnArray('children', tagComponent.children);
  }

  // `tagComponent.children` is `undefined` or `string[]`
  if (
    isDefined(tagComponent.children) &&
    !tagComponent.children.every((child: string) => isString(child))
  ) {
    return warnItem('child', tagComponent.children);
  }

  // `tagComponent.primaryParent` is `undefined` or `string`
  if (
    isDefined(tagComponent.primaryParent) &&
    !isString(tagComponent.primaryParent)
  ) {
    return warnProp('primaryParent', 'string', tagComponent.primaryParent);
  }

  // `tagComponent.virtual` is `undefined` or `boolean`
  if (isDefined(tagComponent.virtual) && !isBoolean(tagComponent.virtual)) {
    return warnProp('virtual', 'boolean', tagComponent.virtual);
  }
  return null;
}
