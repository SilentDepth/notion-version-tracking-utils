import { describe, expect, test } from 'bun:test'
import getDesktopVersions from '../src/get-desktop-versions'

describe('get-desktop-versions', async () => {
  test('should return versions of specific variants', async () => {
    const result = await getDesktopVersions()
    for (const variant of ['windows', 'macos']) {
      expect(result).toHaveProperty(variant)
      // @ts-ignore
      expect(result[variant]).toMatch(/\d+(\.\d+){2}/)
    }
  }, 10_000 /* 10 seconds */)
})
