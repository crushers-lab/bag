import Matrix from "./Matrix";
import MatrixUtils from "./MatrixUtils";

class MatrixOp extends Matrix<number> {

    public static identity(n: number) {
        return new MatrixOp(MatrixUtils.identity(n));
    }

    public inverse(): MatrixOp {
        return new MatrixOp(MatrixUtils.inverse(this.matrix));
    }

    public inverseInPlace(): MatrixOp {
        this.matrix = this.inverse().matrix as any;
        return this;
    }

    public multiply(matrix: MatrixOp): MatrixOp {
        return new MatrixOp(MatrixUtils.multiply(this.matrix, matrix.matrix));
    }

    public multiplyInPlace(matrix: MatrixOp): MatrixOp {
        this.matrix = this.multiply(matrix).matrix;
        return this;
    }

    public transpose(): MatrixOp {
        return super.transpose() as MatrixOp;
    }

    public transposeInPlace(): MatrixOp {
        return super.transposeInPlace() as MatrixOp;
    }
}

export default MatrixOp;
