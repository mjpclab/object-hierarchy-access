import { getPropName } from './common';
function normalizeDescriptor(info) {
    if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getValue: info
        };
    }
    else {
        return {
            name: info
        };
    }
}
function getNameValue(current, descriptor) {
    const { getValue } = descriptor;
    let name = getPropName(current, descriptor);
    let value;
    if (name !== undefined) {
        value = current[name];
    }
    else {
        name = 'undefined';
        if (getValue) {
            value = getValue.call(current, current);
        }
    }
    const { got } = descriptor;
    if (got) {
        got.call(current, current, name, value);
    }
    return { name, value };
}
export { normalizeDescriptor, getNameValue };
