export function validateString(x: any, name: string): string {
  if (typeof(x) === 'string') {
    return x
  }

  throw new Error('Expected string for ' + name + ' and got ' + typeof(x))
}

export function isString(x: any): x is string {
  return typeof x === 'string'
}
