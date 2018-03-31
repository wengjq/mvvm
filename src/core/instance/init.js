import { initState } from './state'
import { initComputed } from './computed'
import Compile from '../compiler/index'

let uid = 0;

export default function initMixin (MVVM) {

  MVVM.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isMVVM = true;
    vm.$options = options || {};
    
    initState(vm);

    initComputed(vm);

    this.$compile = new Compile(this.$options.el || document.body, this);
  }
  
}