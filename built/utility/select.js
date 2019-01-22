function normalizeDescriptor(info) {
    if (Array.isArray(info)) {
        return {
            names: info
        };
    }
    else if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getNames: info
        };
    }
    else {
        return {
            names: info
        };
    }
}
export { normalizeDescriptor };