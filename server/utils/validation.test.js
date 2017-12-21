const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var str1 = isRealString(123);
    expect(str1).toBe(false);
  })
  it(' reject string with only spaces', () => {
    var str2 = isRealString('   ');
    expect(str2).toBe(false);
  })
  it('allow string with non-space characters', () => {
    var str3 = isRealString(' abc ');
    expect(str3).toBe(true);
  })
});
