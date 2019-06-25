/**
 * REGEX for validation url
 * @see https://github.com/jquense/yup/blob/master/lib/string.js#L12
 * @type {RegExp}
 */
const REGEX_URL = /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

/**
 * Checks if value is classified as a String primitive or object.
 * @param  {any}     obj [description]
 * @return {boolean}     [description]
 */
export function isString(obj: any): boolean {
  return typeof obj === "string";
}

export function isTringBlank(obj: any): boolean {
  if (!isString(obj)) {
    return true;
  }

  return (!obj || /^\s*$/.test(obj));
};

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}


export function isNumber(obj: any): boolean {
  return typeof obj === 'number';
}

export function isValidUrl(obj: any) {
  if (isTringBlank(obj)) {
    return false;
  }

  return REGEX_URL.test(obj);
}
