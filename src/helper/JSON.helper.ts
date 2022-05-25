function isJsonString(val: any): val is string {
  try {
    if (typeof val === 'string') {
      JSON.parse(<string>val);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function parseIfJsonString<T>(val: T): T {
  if (isJsonString(val)) {
    return JSON.parse(val) as T;
  }
  return val as T;
}
