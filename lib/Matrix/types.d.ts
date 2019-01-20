export declare type VectorType<Type> = Type[];
export declare type MatrixType<Type> = Array<VectorType<Type>>;
export declare type MatrixOrder = [number, number];
export declare type ScalarOperation = (value: number) => number;
export declare type VectorOperation = (value: number, i: number, j: number) => number;
