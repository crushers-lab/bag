import AbstractCollection from "../Collection/AbstractCollection";
import {clone} from "../Collection/ICloneable";
import {OutOfBoundsException} from "../exceptions";
import MatrixUtils from "./MatrixUtils";
import {MatrixOrder, MatrixType, VectorType} from "./types";

class Matrix<Type> extends AbstractCollection<Type> {

    public get m() {
        return this._order[0];
    }

    public get n() {
        return this._order[1];
    }

    public get matrix() {
        return this._matrix;
    }

    public set matrix(matrix: MatrixType<Type>) {
        this._order = Matrix.getOrder(matrix);
        this._matrix = matrix;
    }

    public static getOrder(matrix: MatrixType<any>): MatrixOrder {
        const m = matrix.length;
        const [row] = matrix;
        const n = row.length;
        return [m, n];
    }

    public static fill(m: number, n: number, val: any): Matrix<any> {
        return new Matrix<any>(MatrixUtils.fill(m, n, val));
    }

    public static concat(a: Matrix<any>, b: Matrix<any>): Matrix<any> {
        return new Matrix<any>(MatrixUtils.concat(a.matrix, b.matrix));
    }

    private static _cloneMatrix(matrix: MatrixType<any>): MatrixType<any> {
        return matrix.map((vector: VectorType<number>) => this._cloneVector(vector));
    }

    private static _cloneVector(vector: VectorType<any>): VectorType<any> {
        return vector.map((value: any) => clone(value));
    }

    private _matrix: MatrixType<Type>;
    private _order: MatrixOrder;

    constructor(matrix: MatrixType<Type> = [[]]) {
        super();
        this._order = Matrix.getOrder(matrix);
        this._matrix = matrix;
    }

    public set(ele: Type, m: number, n: number) {
        this._assertBounds(m, n);
        this._matrix[m][n] = ele;
    }

    public get(m: number, n: number) {
        this._assertBounds(m, n);
        return this._matrix[m][n];
    }

    public clear(): void {
        this.matrix = [[]];
    }

    public clone(): Matrix<Type> {
        return new Matrix<Type>(Matrix._cloneMatrix(this.matrix));
    }

    public entries(): Type[] {
        return Matrix
            ._cloneMatrix(this.matrix)
            .reduce((acc: Type[], vector) => [...acc, ...vector], []);
    }

    public size(): number {
        return this.m * this.n;
    }

    public transpose(): Matrix<Type> {
        return new Matrix<Type>(MatrixUtils.transpose(this.matrix));
    }

    public transposeInPlace(): Matrix<Type> {
        this.matrix = MatrixUtils.transpose(this.matrix);
        return this;
    }

    public extract(mStart: number, nStart: number, mStop: number, nStop: number) {
        return new Matrix<Type>(MatrixUtils.extract(this.matrix, mStart, nStart, mStop, nStop));
    }

    public extractInPlace(mStart: number, nStart: number, mStop: number, nStop: number) {
        this.matrix = this.extract(mStart, nStart, mStop, nStop).matrix;
        return this;
    }

    public concat(matrix: Matrix<Type>): Matrix<Type> {
        return Matrix.concat(this, matrix);
    }

    public concatInPlace(matrix: Matrix<Type>): Matrix<Type> {
        this.matrix = this.concat(matrix).matrix;
        return this;
    }

    protected _assertBounds(m: number, n: number) {
        if (m >= this.m || n >= this.n) {
            throw new OutOfBoundsException();
        }
    }
}

export default Matrix;
