export type VectorType<Type> = Type[];
export type MatrixType<Type> = Array<VectorType<Type>>;
export type MatrixOrder = [number, number];
export type ScalarOperation = (value: number) => number;
export type VectorOperation = (value: number, i: number, j: number) => number;
