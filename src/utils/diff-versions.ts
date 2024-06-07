export function diffVersions (a: string, b: string): [string, string, string] {
  if (a === b) {
    return [a, '', '']
  }

  const aParts = a.split('.')
  const bParts = b.split('.')
  const sameUntil = bParts.findIndex((p, idx) => p !== aParts[idx])

  return [
    aParts.slice(0, sameUntil).join('.') + (sameUntil >= aParts.length - 1 ? '' : '.'),
    aParts.slice(sameUntil).join('.'),
    bParts.slice(sameUntil).join('.'),
  ]
}
