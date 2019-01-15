import AbstractCollection from "../Collection/AbstractCollection";
import { MatrixOrder, MatrixType } from "./types";
declare class Matrix<Type> extends AbstractCollection<Type> {
    readonly m: number;
    readonly n: number;
    matrix: MatrixType<Type>;
    static getOrder(matrix: MatrixType<any>): MatrixOrder;
    static fill(m: number, n: number, val: any): Matrix<any>;
    static concat(a: Matrix<any>, b: Matrix<any>): Matrix<any>;
    private static _cloneMatrix;
    private static _cloneVector;
    private _matrix;
    private _order;
    constructor(matrix?: MatrixType<Type>);
    set(ele: Type, m: number, n: number): void;
    get(m: number, n: number): Type;
    clear(): void;
    clone(): Matrix<Type>;
    entries(): Type[];
    size(): number;
    transpose(): Matrix<Type>;
    transposeInPlace(): Matrix<Type>;
    extract(mStart: number, nStart: number, mStop: number, nStop: number): Matrix<Type>;
    extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number): Matrix<Type>;
    concat(matrix: Matrix<Type>): Matrix<Type>;
    concatInPlace(matrix: Matrix<Type>): Matrix<Type>;
    protected _assertBounds(m: number, n: number): void;
}
export default Matrix;
