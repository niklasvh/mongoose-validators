var validator = require('validator');

function createValidator(callback, options) {
    var message = options.message ? options.message : undefined;
    return {
        validator: callback,
        msg: message
    };
}

function validatorHandler(method) {
    return function(options) {
        var hasOptions = typeof(options) === "object" && !(options instanceof RegExp),
            opts = hasOptions ? options : {},
            skipNull = opts.skipNull ? true : false,
            skipEmpty = opts.skipEmpty ? true : false,
            args = [].slice.call(arguments, hasOptions && method !== "isURL" ? 1 : 0);

        return createValidator(function(value) {
            if (skipNull && (value === null || value === undefined)) {
                return true;
            } else if (skipEmpty && (value === null || value === undefined || value === "")) {
                return true;
            } else {
                return validator[method].apply(null, [value].concat(args));
            }
        }, opts)
    };
}

Object.keys(validator).filter(function(key) {
    return typeof(validator[key]) === "function";
}).forEach(function(method) {
    exports[method] = validatorHandler(method);
});
