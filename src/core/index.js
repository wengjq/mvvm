import MVVM from './instance/index'
import { isServerRendering } from './util/env'

// add prototype
Object.defineProperty(MVVM.prototype, '$isServer', {
  get: isServerRendering
})

MVVM.version = '1.0.0';

export default MVVM;