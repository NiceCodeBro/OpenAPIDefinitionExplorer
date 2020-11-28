//export type NodeTypes = 'string' | 'number' | 'integer' | 'array' | 'object';

export enum NodeTypes {
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    ARRAY = "array",
    OBJECT = "object"
  }

export interface INode {
    type: NodeTypes;
    name?: string;
    description?: string;
    properties?: object;
    items?: object;
} 