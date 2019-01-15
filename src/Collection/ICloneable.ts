interface ICloneable {
    clone(): ICloneable;
}

export function isCloneable(value: any): value is ICloneable {
    return (value as ICloneable).clone !== undefined;
}

export function clone(value: any) {
    return value ? (isCloneable(value) ? value.clone() : value) : value;
}

export default ICloneable;
