function classes(...names) {
    return names.filter(Boolean).join(' ');
}

export default classes;


const scopedClassMaker = (prefix) =>
    (name, options) => Object.entries(name instanceof Object ? name : {[name]: name}).filter(kv => kv[1] !== false)
    .map(kv => kv[0])
    .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
    .concat(options && options.extra || [])
    .join(' ');

export {scopedClassMaker};
