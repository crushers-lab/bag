interface ICloneable {
    clone(): ICloneable;
}
export declare function isCloneable(value: any): value is ICloneable;
export default ICloneable;
