import {observe} from '../observer/index'

export function initState (vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true);
  }
}

export function proxy (target, sourceKey, key) {

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return target[sourceKey][key];;
    },
    set: (newVal) => {
      target[sourceKey][key] = newVal;
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
  // observe data
  observe(data, true /* asRootData */);
}