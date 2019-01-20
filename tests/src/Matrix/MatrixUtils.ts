import MatrixUtils from "../../../src/Matrix/MatrixUtils";

describe("Tests on MatrixUtils", () => {
    test("Test on add column", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        let expected = [
            [0, 1, 2, 3],
            [0, 4, 5, 6],
            [0, 7, 8, 9]
        ];
        expect(MatrixUtils.addColumn(matrix, 0, 0)).toEqual(expected);

        expected = [
            [1, 1, 2, 3],
            [4, 1, 5, 6],
            [7, 1, 8, 9]
        ];
        expect(MatrixUtils.addColumn(matrix, 1, 1)).toEqual(expected);

        expected = [
            [1, 2, 10, 3],
            [4, 5, 11, 6],
            [7, 8, 12, 9]
        ];
        expect(MatrixUtils.addColumn(matrix, [10, 11, 12], 2)).toEqual(expected);
    });

    test("Test on add row", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        let expected = [
            [0, 0, 0],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(MatrixUtils.addRow(matrix, 0, 0)).toEqual(expected);

        expected = [
            [1, 2, 3],
            [1, 1, 1],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(MatrixUtils.addRow(matrix, 1, 1)).toEqual(expected);

        expected = [
            [1, 2, 3],
            [4, 5, 6],
            [10, 11, 12],
            [7, 8, 9]
        ];
        expect(MatrixUtils.addRow(matrix, [10, 11, 12], 2)).toEqual(expected);
    });
});
