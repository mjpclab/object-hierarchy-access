function normalizeDescriptor(info) {
    if (info && typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getName: info,
            value: {}
        };
    }
    else {
        return {
            name: info,
            value: {}
        };
    }
}
export { normalizeDescriptor };