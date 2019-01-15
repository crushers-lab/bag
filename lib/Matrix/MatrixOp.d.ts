import Matrix from "./Matrix";
declare class MatrixOp extends Matrix<number> {
    static identity(n: number): MatrixOp;
    inverse(): MatrixOp;
    inverseInPlace(): MatrixOp;
    multiply(matrix: MatrixOp): MatrixOp;
    multiplyInPlace(matrix: MatrixOp): MatrixOp;
    transpose(): MatrixOp;
    transposeInPlace(): MatrixOp;
}
export default MatrixOp;
