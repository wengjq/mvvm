/**
 * Define a property.
 */
const _toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
