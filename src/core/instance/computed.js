export function initComputed (vm) {
	let computed = vm.$options.computed;

	if (typeof computed === 'object') {
    Object.keys(computed).forEach(function(key) {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === 'function' 
                    ? computed[key] 
                    : computed[key].get,
            set: function() {}
        });
    });
	}
}