//export type PropertyTypes = 'string' | 'number' | 'integer' | 'array' | 'object';

export enum PropertyTypes {
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    ARRAY = "array",
    OBJECT = "object"
  }

export interface IProperty {
    type: PropertyTypes;
    name?: string;
    description?: string;
    properties?: object;
    items?: object;
} 