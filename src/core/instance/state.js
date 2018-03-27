export function initState (vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  } else {
   // observe(vm._data = {}, true);
  }
}

export function proxy (target, sourceKey, key) {
  var _this = this;

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function proxyGetter() {
      return _this[sourceKey][key];;
    },
    set: function proxySetter(newVal) {
      _thisthis[sourceKey][key] = newVal;
    }
  });
}

/**
 * 代理 vm._data.xxx 属性 为 vm.xxx
 * 给 vm._data 属性遍历, 设置为观察者
 */
function initData (vm) {
  let data = vm.$options.data;
  vm._data = data || {};

  const keys = Object.keys(data)

  let i = keys.length
  while (i--) {
    const key = keys[i];

    proxy(vm, `_data`, key);
  }
  console.log(vm)
}