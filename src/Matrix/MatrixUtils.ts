import Matrix from "./Matrix";
import {MatrixType, VectorType} from "./types";

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

    public static multiply(a: MatrixType<number>, b: MatrixType<number>): MatrixType<number> {
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

    public static cloneMatrix(matrix: MatrixType<number>): MatrixType<number> {
        return matrix.map((vector: VectorType<number>) => this.cloneVector(vector));
    }

    public static cloneVector(vector: VectorType<number>): VectorType<number> {
        return [...vector];
    }
}

export default MatrixUtils;
