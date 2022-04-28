import { validateString, isString } from "../utilFunctions"

jest.mock("../api/dbUtils", () => () => false);

describe('Check isString Functionality', () => {
  it('check string value', async () => {
    
    const search = isString('test')
    expect(search).toBeTruthy
  })

  it('check number value', async () => {
    
    const search = isString(123)
    expect(search).toBeFalsy
  })

  it('check array value', async () => {
    
    const search = isString(['hi'])
    expect(search).toBeFalsy
  })
})

describe('Check validateString Functionality', () => {
    it('check string value', async () => {
      
      const search = validateString('test', 'search')
      expect(search).toBeTruthy
    })
  
    it('check error when number value', async () => {
      
      expect(() => validateString(1, 'search')).toThrowError('Expected string for search and got number')
    })
  })