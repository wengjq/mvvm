import initMixin from './init'

function MVVM (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof MVVM)
  ) {
    warn('MVVM is a constructor and should be called with the `new` keyword')
  }
  
  this._init(options)
}

initMixin(MVVM);

export default MVVM