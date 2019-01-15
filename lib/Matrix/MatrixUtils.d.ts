import { MatrixType } from "./types";
declare class MatrixUtils {
    static transpose(matrix: MatrixType<any>): MatrixType<any>;
    static inverse(matrix: MatrixType<number>): MatrixType<number>;
    static extract(matrix: MatrixType<any>, mStart: number, nStart?: number, mStop?: number, nStop?: number): any[][];
    static concat(a: MatrixType<any>, b: MatrixType<any>): any[][];
    static multiply(a: MatrixType<number>, b: MatrixType<number>): MatrixType<number>;
    static fill(m: number, n: number, num: any): MatrixType<any>;
    static identity(n: number): number[][];
}
export default MatrixUtils;
