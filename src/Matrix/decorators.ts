import MatrixUtils from "./MatrixUtils";
import {MatrixType} from "./types";

export function replaceNaN() {
    return (_target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        // tslint:disable-next-line
        descriptor.value = function () {
            const matrix: MatrixType<number> = originalMethod.apply(MatrixUtils, arguments);
            return MatrixUtils.replaceNaN(matrix, 0);
        };

        return descriptor;
    };
}
