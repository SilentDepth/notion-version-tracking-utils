import { describe, expect, test } from 'bun:test'
import { diffVersions } from '../../src/utils/diff-versions'

const VER_A = '2.12.23.0.15.259'
const VER_B = '2.12.23.0.16.0'

describe('utils/diff-versions', () => {
  test('same version', () => {
    expect(diffVersions(VER_A, VER_A)).toEqual([VER_A, '', ''])
  })

  test('same length', () => {
    expect(diffVersions(VER_A, VER_B)).toEqual([
      '2.12.23.0.',
      '15.259',
      '16.0',
    ])
  })

  test('shorter a', () => {
    expect(diffVersions('2.12', '2.12.1')).toEqual(['2.12', '', '1'])
  })

  test('shorter b', () => {
    expect(diffVersions('2.12.1', '2.13')).toEqual(['2.', '12.1', '13'])
  })
})
