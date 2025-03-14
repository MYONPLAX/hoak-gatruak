import type { TagsDefinition } from '../../common/commonInit.js';
import { fmtName, printResult } from '../../common/messageFormat.js';
import type IntfTagComponent from '../interfaces/IntfTagComponent.js';

export default class TagComponent {
  parents: string[];
  children: string[];
  primaryParent: string | undefined;
  virtual: boolean;
  depth: number;

  constructor(tagComponent: IntfTagComponent) {
    this.parents = tagComponent.parents ?? [];
    this.children = tagComponent.children ?? [];
    this.primaryParent =
      tagComponent.primaryParent ?? this.parents[0] ?? undefined;
    this.virtual = tagComponent.virtual ?? false;
    this.depth = 0;
  }

  /**
   * Print tag parent child relation
   * @param tagX Parent or Child
   * @param tagY Child or Parent
   */
  private printCheckInfo(tagX: string, tagY: string) {
    printResult.info(
      '🏷️',
      fmtName('relation', `Checking relationship: ${tagX} -> ${tagY}`)
    );
  }

  private hasValidParent(
    tagName: string,
    tagsDef: TagsDefinition,
    debug: boolean
  ): boolean {
    return this.parents.every((parentTagName) => {
      if (debug) this.printCheckInfo(parentTagName, tagName);
      if (tagName === parentTagName) {
        printResult.error('Cycle detected in the tag dependencies.');
        return false;
      }
      return tagsDef[parentTagName].children.includes(tagName);
    });
  }

  private hasValidChild(
    tagName: string,
    tagsDef: TagsDefinition,
    debug: boolean
  ): boolean {
    return this.children.every((childTagName) => {
      if (debug) this.printCheckInfo(tagName, childTagName);
      if (tagName === childTagName) {
        printResult.error('Cycle detected in the tag dependencies.');
        return false;
      }
      return tagsDef[childTagName].parents.includes(tagName);
    });
  }

  /**
   * Check `primaryParent` is include in `parents`
   * @returns `primaryParent` exist in `parents`
   */
  private validatePrimaryParent() {
    return !(this.primaryParent && !this.parents.includes(this.primaryParent));
  }

  /**
   * Check tag Parent-Child relationships are valid
   * @param tagName Tag name
   * @param tagsDef Tags definition
   * @param debug Debug flag for print message
   * @returns Tag relationships of Parent-Child are correct
   */
  public validateParentChildRelations(
    tagName: string,
    tagsDef: TagsDefinition,
    debug: boolean
  ): boolean {
    const formattedTag = fmtName('tag', tagName);

    const tagRelation = (relation: 'P-T' | 'T-C') =>
      relation === 'P-T' ? 'Parent -> Tag' : 'Tag -> Child';

    const errorMessage = (relationType: string) =>
      ` ${formattedTag}: Relationship ${fmtName('relation', relationType)} is broken.`;

    if (!this.hasValidParent(tagName, tagsDef, debug)) {
      printResult.warning(errorMessage(tagRelation('P-T')));
      return false;
    }

    if (!this.hasValidChild(tagName, tagsDef, debug)) {
      printResult.warning(errorMessage(tagRelation('T-C')));
      return false;
    }

    if (this.primaryParent && !this.validatePrimaryParent()) {
      printResult.warning(
        `${formattedTag}: ${fmtName('prop', 'primaryParent')} ${fmtName('tag', this.primaryParent)} does not include in ${fmtName('prop', 'parents')}`
      );
      return false;
    }
    return true;
  }

  /**
   * Search parents tags recursive and collect them
   * @param tagName Child tag
   * @param tagList Tags for article
   * @param tagsDef Tags definition
   */
  public collectParents(
    tagName: string,
    tagList: Set<string>,
    tagsDef: TagsDefinition
  ) {
    if (this.parents.length > 0) {
      this.parents.forEach((parent) =>
        tagsDef[parent].collectParents(parent, tagList, tagsDef)
      );
    }
    tagList.add(tagName);
  }

  /**
   * Search children tags recursive and register to tags order
   * @param tagName Parent tag
   * @param tagsOrder Defined tags order
   * @param tagsDef Tags definition
   */
  public registerChildrenToOrder(
    tagName: string,
    tagsOrder: Set<string>,
    tagsDef: TagsDefinition
  ) {
    this.children.forEach((child) => {
      // check child's primary parent
      const cpParent = tagsDef[child].primaryParent;

      // is c-p-parent is same
      if (cpParent === tagName) {
        tagsOrder.add(child);
        tagsDef[child].registerChildrenToOrder(child, tagsOrder, tagsDef);
      }
    });
  }
}
