import Matrix from "./Matrix";
import { VectorType } from "./types";
declare class MatrixOp extends Matrix<number> {
    static identity(n: number): MatrixOp;
    static fill(m: number, n: number, val: number): MatrixOp;
    private static getValue;
    inverse(): MatrixOp;
    inverseInPlace(): MatrixOp;
    multiply(matrix: MatrixOp | number): MatrixOp;
    multiplyInPlace(matrix: MatrixOp | number): MatrixOp;
    add(matrix: MatrixOp | number): MatrixOp;
    addInPlace(matrix: MatrixOp | number): MatrixOp;
    sub(matrix: MatrixOp | number): MatrixOp;
    subInPlace(matrix: MatrixOp | number): MatrixOp;
    divide(value: number): MatrixOp;
    divideInPlace(value: number): MatrixOp;
    transpose(): MatrixOp;
    transposeInPlace(): MatrixOp;
    extract(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp;
    extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp;
    concat(matrix: MatrixOp): MatrixOp;
    concatInPlace(matrix: MatrixOp): MatrixOp;
    addColumn(value?: number | VectorType<number>, index?: number): MatrixOp;
    addColumnInPlace(value?: number | VectorType<number>, index?: number): MatrixOp;
    addRow(value?: number | VectorType<number>, index?: number): MatrixOp;
    addRowInPlace(value?: number | VectorType<number>, index?: number): MatrixOp;
    clone(): MatrixOp;
}
export default MatrixOp;
