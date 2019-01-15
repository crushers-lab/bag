interface ICloneable {
    clone(): ICloneable;
}
export declare function isCloneable(value: any): value is ICloneable;
export declare function clone(value: any): any;
export default ICloneable;
