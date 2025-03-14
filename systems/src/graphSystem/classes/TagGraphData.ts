import {
  generateTagHash,
  type TagsDefinition,
} from '../../common/commonInit.js';
import type IntfGraphTagNode from '../interfaces/IntfGraphTagNode.js';
import type IntfGraphTagEdge from '../interfaces/IntfGraphTagEdge.js';

export default class TagGraphData {
  private tagNodes: IntfGraphTagNode[]; // Tags name and hash
  private tagEdges: IntfGraphTagEdge[]; // Relation of Parent - Child
  private rootTags: string[]; // Tags which do not have any aprents
  private leafTags: string[]; // Tags which do not have any children
  private virtualTags: string[]; // Tags which `virtual` are true

  constructor(tagsDef: TagsDefinition) {
    this.tagNodes = [];
    this.tagEdges = [];
    this.rootTags = [];
    this.leafTags = [];
    this.virtualTags = [];

    // Scan Tags definition
    for (const parentName in tagsDef) {
      const parentTag = tagsDef[parentName];

      // Add the parent name and hashed name
      const tagNode: IntfGraphTagNode = {
        name: parentName,
        hash: generateTagHash(parentName),
      };

      // Collect all tag nodes
      this.tagNodes.push(tagNode);

      // Check the relation (Add tag to `tagEdges`)
      parentTag.children.forEach((childName) => {
        const primary = parentName === tagsDef[childName].primaryParent;
        const edge = { parentName, childName, primary };
        this.tagEdges.push(edge);
      });

      // Whether the tag does not have any parents (Tag is `rootTags`)
      if (parentTag.primaryParent === undefined) this.rootTags.push(parentName);

      // Whether the tag does not have any children (Tag is `rootLeafs`)
      if (parentTag.children.length === 0) this.leafTags.push(parentName);

      // Whether the tag is virtual (`virtualTags`)
      if (parentTag.virtual) this.virtualTags.push(parentName);
    }
  }

  private edgeToText(edge: IntfGraphTagEdge): string {
    return `${generateTagHash(edge.parentName)} ${edge.primary ? '--->' : '-..->'} ${generateTagHash(edge.childName)};`;
  }

  public getNodes(): string[] {
    return this.tagNodes.map((node) => `${node.hash}("${node.name}");`);
  }

  public getEdges(): string[] {
    return this.tagEdges.map((edge) => this.edgeToText(edge));
  }

  public getRootTags(): string[] {
    return this.rootTags.map((tag) => generateTagHash(tag));
  }

  public getLeafTags(): string[] {
    return this.leafTags.map((tag) => generateTagHash(tag));
  }

  public getVirtualTags(): string[] {
    return this.virtualTags.map((tag) => generateTagHash(tag));
  }
}
