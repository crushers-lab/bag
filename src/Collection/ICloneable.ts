interface ICloneable {
    clone(): ICloneable;
}

export function isCloneable(value: any): value is ICloneable {
    return (value as ICloneable).clone !== undefined;
}

export default ICloneable;
