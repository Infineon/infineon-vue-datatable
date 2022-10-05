function isPlainObject(value) {
  if (value == null || typeof value !== 'object') return false;
  return Object.getPrototypeOf(value) === Object.prototype;
}

function copy(obj, key, value) {
  if (isPlainObject(value)) {
    if (!obj[key]) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = {};
    }
    deepExtend(obj[key], value);
  } else {
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;
  }
}

export function deepExtend(target, source) {
  if (isPlainObject(source)) {
    const keys = Object.keys(source);

    for (let i = 0, len = keys.length; i < len; i++) {
      copy(target, keys[i], source[keys[i]]);
    }
  }

  return target;
}
