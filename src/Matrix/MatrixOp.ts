import _ from "lodash";
import Matrix from "./Matrix";
import MatrixUtils from "./MatrixUtils";
import {MatrixType, VectorType} from "./types";

class MatrixOp extends Matrix<number> {

    public static identity(n: number) {
        return new MatrixOp(MatrixUtils.identity(n));
    }

    public static fill(m: number, n: number, val: number): MatrixOp {
        return new MatrixOp(MatrixUtils.fill(m, n, val));
    }

    private static getValue(matrix: MatrixOp | number): MatrixType<number> | number {
        return _.isNumber(matrix) ? matrix : matrix.matrix;
    }

    public inverse(): MatrixOp {
        return new MatrixOp(MatrixUtils.inverse(this.matrix));
    }

    public inverseInPlace(): MatrixOp {
        this.matrix = this.inverse().matrix;
        return this;
    }

    public pInverse(): MatrixOp {
        return new MatrixOp(MatrixUtils.pInverse(this.matrix));
    }

    public pInverseInPlace(): MatrixOp {
        this.matrix = this.pInverse().matrix;
        return this;
    }

    public multiply(matrix: MatrixOp | number): MatrixOp {
        return new MatrixOp(MatrixUtils.multiply(this.matrix, MatrixOp.getValue(matrix)));
    }

    public multiplyInPlace(matrix: MatrixOp | number): MatrixOp {
        this.matrix = this.multiply(matrix).matrix;
        return this;
    }

    public add(matrix: MatrixOp | number): MatrixOp {
        return new MatrixOp(MatrixUtils.add(this.matrix, MatrixOp.getValue(matrix)));
    }

    public addInPlace(matrix: MatrixOp | number): MatrixOp {
        this.matrix = this.add(matrix).matrix;
        return this;
    }

    public sub(matrix: MatrixOp | number): MatrixOp {
        return new MatrixOp(MatrixUtils.sub(this.matrix, MatrixOp.getValue(matrix)));
    }

    public subInPlace(matrix: MatrixOp | number): MatrixOp {
        this.matrix = this.sub(matrix).matrix;
        return this;
    }

    public divide(value: number): MatrixOp {
        return new MatrixOp(MatrixUtils.divide(this.matrix, value));
    }

    public divideInPlace(value: number): MatrixOp {
        this.matrix = this.divide(value).matrix;
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

    public addColumn(value: number | VectorType<number> = 1, index: number = 0): MatrixOp {
        return new MatrixOp(MatrixUtils.addColumn(this.matrix, value, index));
    }

    public addColumnInPlace(value: number | VectorType<number> = 1, index: number = 0): MatrixOp {
        this.matrix = this.addColumn(value, index).matrix;
        return this;
    }

    public addRow(value: number | VectorType<number> = 1, index: number = 0): MatrixOp {
        return new MatrixOp(MatrixUtils.addColumn(this.matrix, value, index));
    }

    public addRowInPlace(value: number | VectorType<number> = 1, index: number = 0): MatrixOp {
        this.matrix = this.addRow(value, index).matrix;
        return this;
    }

    public clone(): MatrixOp {
        return new MatrixOp(super.clone().matrix);
    }
}

export default MatrixOp;
