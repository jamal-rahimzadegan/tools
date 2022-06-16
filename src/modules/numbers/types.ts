// @ts-ignore Todo: fix this
type ComplexObject<T = string | number | symbol> = Record<T, any>;

type NestedObject = Record<string, any>;

export type { ComplexObject, NestedObject };
