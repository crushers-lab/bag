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

    public extract(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp {
        return super.extract(mStart, nStart, mStop, nStop) as MatrixOp;
    }

    public extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number): MatrixOp {
        return super.extractInPlace(mStart, nStart, mStop, nStop) as MatrixOp;
    }

    public concat(matrix: MatrixOp): MatrixOp {
        return super.concat(matrix) as MatrixOp;
    }

    public concatInPlace(matrix: MatrixOp): MatrixOp {
        return super.concatInPlace(matrix) as MatrixOp;
    }

    public clone(): MatrixOp {
        return super.clone() as MatrixOp;
    }
}

export default MatrixOp;
