export default interface IntfTagComponent {
  parents?: string[];
  children?: string[];
  primaryParent?: string;
  virtual?: boolean;
  depth?: number;
}
