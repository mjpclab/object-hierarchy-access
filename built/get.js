import { normalizeDescriptor, getNameValue } from './utility/get';
function get(target, ...rest) {
    const hierarchies = Array.prototype.concat.apply([], rest);
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const { value } = getNameValue(current, descriptor);
            current = value;
            return current;
        });
    }
    return current;
}
export { get };
