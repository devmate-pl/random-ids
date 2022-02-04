import nrb from '@/services/generators/nrb.js'

import { describe, expect, it } from '@jest/globals'

describe('nrb', () => {
  it('should generate 11 digits number', () => {
    const acct = nrb.nrb('PL', '1920')

    expect(acct.length).toBe(26)
  })

  it('should calculate 2 control digits when modulo is 1 digit', () => {
    const controlDigit = nrb.calculateProperControlNumber('PL', '1020', '00037256973748943385')

    expect(controlDigit.length).toBe(2)
    expect(controlDigit).toBe('06')
  })
})
