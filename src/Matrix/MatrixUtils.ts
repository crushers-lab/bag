import _ from "lodash";
import {clone} from "../Collection/ICloneable";
import Matrix from "./Matrix";
import {MatrixType, ScalarOperation, VectorOperation, VectorType} from "./types";

class MatrixUtils {
    public static transpose(matrix: MatrixType<any>): MatrixType<any> {
        const tp: MatrixType<any> = [];
        const [m, n] = Matrix.getOrder(matrix);
        for (let i = 0; i < n; i++) {
            tp[i] = [];
            for (let j = 0; j < m; j++) {
                tp[i][j] = matrix[j][i];
            }
        }
        return tp;
    }

    public static inverse(matrix: MatrixType<number>): MatrixType<number> {
        const [m, n] = Matrix.getOrder(matrix);
        if (m !== n) {
            throw new Error("Not a square matrix");
        }
        const id = this.identity(n);
        const adj = this.concat(matrix, id);
        const n2 = 2 * n;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    const ratio = adj[j][i] / adj[i][i];
                    for (let k = 0; k < n2; k++) {
                        adj[j][k] -= ratio * adj[i][k];
                    }
                }
            }
        }
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (adj[n - 1][i] === 0) {
                count++;
            }
        }
        if (count === n) {
            throw new Error("Cannot find inverse of matrix");
        }
        for (let i = 0; i < n; i++) {
            const a = adj[i][i];
            for (let j = 0; j < n2; j++) {
                adj[i][j] /= a;
            }
        }
        return this.extract(adj, 0, n, n, n);
    }

    public static extract(matrix: MatrixType<any>, mStart: number, nStart: number = mStart,
                          mStop: number = 0, nStop: number = 0) {
        return matrix
            .slice(mStart, mStart + mStop)
            .map((vector: VectorType<any>) => vector.slice(nStart, nStart + nStop));
    }

    public static concat(a: MatrixType<any>, b: MatrixType<any>) {
        const [m, n] = Matrix.getOrder(a);
        const [p, q] = Matrix.getOrder(b);
        if (m !== p || n !== q) {
            throw new Error("Order should be same for concat");
        }
        return a.map((vector: VectorType<any>, index: number) => [...vector, ...b[index]]);
    }

    public static multiply(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number> {
        if (_.isNumber(b)) {
            return this.scalarOperation(a, (value) => value * b);
        }
        const [m, n] = Matrix.getOrder(a);
        const [p, q] = Matrix.getOrder(b);
        if (n !== p) {
            throw new Error("n is not equal to p. Not able to multiply");
        }
        const c = this.fill(m, q, 0);
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < q; j++) {
                for (let k = 0; k < n; ++k) {
                    c[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return c;
    }

    public static divide(matrix: MatrixType<number>, scalar: number): MatrixType<number> {
        return this.scalarOperation(matrix, (value: number) => value / scalar);
    }

    public static add(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number> {
        if (_.isNumber(b)) {
            return this.scalarOperation(a, (value: number) => value + b);
        }
        this.assertOrder(a, b);
        return this.vectorOperation(a, (value, i, j) => value + b[i][j]);
    }

    public static sub(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number> {
        if (_.isNumber(b)) {
            return this.scalarOperation(a, (value: number) => value - b);
        }
        this.assertOrder(a, b);
        return this.vectorOperation(a, (value, i, j) => value - b[i][j]);
    }

    public static assertOrder(a: MatrixType<any>, b: MatrixType<any>) {
        const [m, n] = Matrix.getOrder(a);
        const [p, q] = Matrix.getOrder(b);
        if (m !== p || n !== q) {
            throw new Error("Order mismatch during addition of matrix");
        }
    }

    public static vectorOperation(matrix: MatrixType<number>, operation: VectorOperation): MatrixType<number> {
        return matrix.map(
            (vector: VectorType<number>, i: number) => vector.map(
                (value: number, j: number) => operation(value, i, j),
            ),
        );
    }

    public static scalarOperation(matrix: MatrixType<number>, operation: ScalarOperation): MatrixType<number> {
        return matrix.map(
            (vector: VectorType<number>) => vector.map(
                (value: number) => operation(value),
            ),
        );
    }

    public static fillVector(size: number, value: any): any[] {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(value);
        }
        return array;
    }

    public static addColumn(matrix: MatrixType<number>, value: number | VectorType<number> = 1,
                            index: number = 0): MatrixType<number> {
        let vector: number[] = [];
        const [m] = Matrix.getOrder(matrix);
        if (_.isNumber(value)) {
            vector = this.fillVector(m, value);
        } else {
            if (m !== value.length) {
                throw new Error("Vector length should be same as m of matrix");
            }
            vector = [...value];
        }
        return this.eachVector(matrix, (v, i) => this.addValueAt(v, vector[i], index));
    }

    public static addRow(matrix: MatrixType<number>, value: number | VectorType<number> = 1,
                         index: number = 0): MatrixType<number> {
        let vector: number[] = [];
        const n = Matrix.getOrder(matrix)[1];
        if (_.isNumber(value)) {
            vector = this.fillVector(n, value);
        } else {
            if (n !== value.length) {
                throw new Error("Vector length should be same as n of matrix");
            }
            vector = [...value];
        }
        return this.addValueAt(matrix, vector, index);
    }

    public static addValueAt(source: any[], value: any, index: number = 0) {
        const start = source.slice(0, index);
        const end = source.slice(index, source.length);
        return [...start, value, ...end];
    }

    public static eachVector(matrix: MatrixType<number>,
                             operation: (vector: VectorType<number>, index: number) => VectorType<number>) {
        return matrix.map((vector: VectorType<number>, index: number) => operation(vector, index));
    }

    public static fill(m: number, n: number, num: any): MatrixType<any> {
        const matrix: MatrixType<any> = [];
        for (let i = 0; i < m; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = num;
            }
        }
        return matrix;
    }

    public static identity(n: number) {
        const matrix: MatrixType<number> = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = (i === j) ? 1 : 0;
            }
        }
        return matrix;
    }

    public static cloneMatrix(matrix: MatrixType<any>): MatrixType<any> {
        return matrix.map((vector: VectorType<any>) => this.cloneVector(vector));
    }

    public static cloneVector(vector: VectorType<any>): VectorType<any> {
        return vector.map((value) => clone(value));
    }
}

export default MatrixUtils;
