import Matrix from "./Matrix";
import MatrixUtils from "./MatrixUtils";

class MatrixOp extends Matrix<number> {

    public static identity(n: number) {
        return new MatrixOp(MatrixUtils.identity(n));
    }

    public static fill(m: number, n: number, val: number): MatrixOp {
        return new MatrixOp(MatrixUtils.fill(m, n, val));
    }

    public inverse(): MatrixOp {
        return new MatrixOp(MatrixUtils.inverse(this.matrix));
    }

    public inverseInPlace(): MatrixOp {
        this.matrix = this.inverse().matrix;
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
        return new MatrixOp(super.transpose().matrix);
    }

    public transposeInPlace(): MatrixOp {
        super.transposeInPlace();
        return this;
    }

    public extract(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp {
        return new MatrixOp(super.extract(mStart, nStart, mStop, nStop).matrix);
    }

    public extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp {
        super.extractInPlace(mStart, nStart, mStop, nStop);
        return this;
    }

    public concat(matrix: MatrixOp): MatrixOp {
        return new MatrixOp(super.concat(matrix).matrix) as MatrixOp;
    }

    public concatInPlace(matrix: MatrixOp): MatrixOp {
        super.concatInPlace(matrix);
        return this;
    }

    public clone(): MatrixOp {
        return new MatrixOp(super.clone().matrix);
    }
}

export default MatrixOp;
