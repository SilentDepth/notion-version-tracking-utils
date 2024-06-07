import { describe, expect, test } from 'bun:test'
import getAppVersion from '../src/get-app-version'

describe('get-app-version', () => {
  test('should return version', async () => {
    expect((await getAppVersion()).full).toMatch(/\d+(\.\d+){5}/)
  }, 10_000 /* 10 seconds */)
})
