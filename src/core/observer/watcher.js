import Dep, {pushTarget, popTarget} from './dep'
import {
  hasOwn
} from '../util/index'

/**
 * 
 * 观察员
 * @param {any} vm 
 * @param {any} expOrFn 
 * @param {any} cb 
 * @param {any} options 
 */
class Watcher {
  constructor (vm, expOrFn, cb, options = {}) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.depIds = {};
    this.newDepIds = {};

    this.lazy = !!options.lazy;
    this.dirty = this.lazy;
    
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = this.parseGetter(expOrFn);
    }

    // 观察员 value
    this.value = this.lazy ? undefined : this.get();
  }

  update () {
    // 如果为计算属性的watcher，则延缓更新。设置数据为dirty
    if (this.lazy) {
      this.dirty = true;
    } else {
      // 数据对象直接更新
      this.run();
    }
  }
  // 非计算属性获取value
  run () {
    var value = this.get();
    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      // 更新视图的指令
      this.cb.call(this.vm, value, oldVal);
    }
  }

  /**
   * watcher 观察员 加入到某个被观察数据集合中
   * @param {Dep} dep
   */
  addDep (dep) {
    this.newDepIds[dep.id] = dep;

    if (!hasOwn(this.depIds, dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    // 设置当前的 Watcher 
    pushTarget(this);
    const vm = this.vm;

    // 获取value的同时
    // 为数据的观察者添加watcher
    // 如果为computed 计算属性, 则会出发内部多次的 getter 调用
    // 则内部的数据观察对象会收集同一个 watcher
    let value = this.getter && this.getter.call(vm, vm);

    popTarget();
    this.cleanupDeps();

    return value;
  }
  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get();
    this.dirty = false;
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let maps = Object.keys(this.depIds);

    maps.forEach((key) => {
      this.depIds[key].depend();
    });
  }
  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let keys = Object.keys(this.depIds);

    keys.forEach((key) => {
      const dep = this.depIds[key];
      // 删除旧的观察者依赖
      if (!hasOwn(this.newDepIds, dep.id)) {
        dep.removeSub(this);
      }
    });

    this.depIds = this.newDepIds;
    this.newDepIds = Object.create(null);
  }

  parseGetter (exp) {
    if (/[^\w.$]/.test(exp)) {
      return;
    }
    var exps = exp.split('.');

    /**
     * @param {object} obj
     */
    return (obj) => {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
}

export default Watcher;
