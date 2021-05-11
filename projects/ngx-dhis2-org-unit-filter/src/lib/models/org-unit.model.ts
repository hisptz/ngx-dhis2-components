export interface OrgUnit {
  id: string;
  name: string;
  level?: number;
  path?: string;
  selected?: boolean;
  children?: OrgUnit[];
  parent?: { id: string };
  type?: string;
  icon?: string;
  description?: string;
}
