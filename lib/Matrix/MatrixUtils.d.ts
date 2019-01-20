import { MatrixType, ScalarOperation, VectorOperation, VectorType } from "./types";
declare class MatrixUtils {
    static transpose(matrix: MatrixType<any>): MatrixType<any>;
    static inverse(matrix: MatrixType<number>): MatrixType<number>;
    static extract(matrix: MatrixType<any>, mStart: number, nStart?: number, mStop?: number, nStop?: number): any[][];
    static concat(a: MatrixType<any>, b: MatrixType<any>): any[][];
    static multiply(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number>;
    static divide(matrix: MatrixType<number>, scalar: number): MatrixType<number>;
    static add(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number>;
    static sub(a: MatrixType<number>, b: number | MatrixType<number>): MatrixType<number>;
    static assertOrder(a: MatrixType<any>, b: MatrixType<any>): void;
    static vectorOperation(matrix: MatrixType<number>, operation: VectorOperation): MatrixType<number>;
    static scalarOperation(matrix: MatrixType<number>, operation: ScalarOperation): MatrixType<number>;
    static fillVector(size: number, value: any): any[];
    static addColumn(matrix: MatrixType<number>, value?: number | VectorType<number>, index?: number): MatrixType<number>;
    static addRow(matrix: MatrixType<number>, value?: number | VectorType<number>, index?: number): MatrixType<number>;
    static addValueAt(source: any[], value: any, index?: number): any[];
    static eachVector(matrix: MatrixType<number>, operation: (vector: VectorType<number>, index: number) => VectorType<number>): number[][];
    static fill(m: number, n: number, num: any): MatrixType<any>;
    static identity(n: number): number[][];
    static cloneMatrix(matrix: MatrixType<any>): MatrixType<any>;
    static cloneVector(vector: VectorType<any>): VectorType<any>;
}
export default MatrixUtils;
