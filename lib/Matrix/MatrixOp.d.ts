import Matrix from "./Matrix";
declare class MatrixOp extends Matrix<number> {
    static identity(n: number): MatrixOp;
    static fill(m: number, n: number, val: number): MatrixOp;
    inverse(): MatrixOp;
    inverseInPlace(): MatrixOp;
    multiply(matrix: MatrixOp): MatrixOp;
    multiplyInPlace(matrix: MatrixOp): MatrixOp;
    transpose(): MatrixOp;
    transposeInPlace(): MatrixOp;
    extract(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp;
    extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp;
    concat(matrix: MatrixOp): MatrixOp;
    concatInPlace(matrix: MatrixOp): MatrixOp;
    clone(): MatrixOp;
}
export default MatrixOp;
