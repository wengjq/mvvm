let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * 观察员允许多个指令订阅者订阅
 */
class Dep {
  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    var index = this.subs.indexOf(sub);

    if (index != -1) {
      this.subs.splice(index, 1);
    }
  }
  // 数据对象 注入 comipler 的 watcher
  // 如果是计算属性的 watcher, 则会多个数据对象 注入一个watcher
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null;

const targetStack = [];

export function pushTarget (_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

export function popTarget () {
  Dep.target = targetStack.pop();
}

export default Dep;
