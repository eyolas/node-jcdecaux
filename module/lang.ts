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
  return !isTringBlank(obj);
}
