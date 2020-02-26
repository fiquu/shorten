import { expect } from 'chai';

import shorten from '../../src';

describe('Shorten', function () {
  it('should be a function', function () {
    expect(shorten).to.be.a('function');
  });

  it('should handle empty inputs', function () {
    for (const input of [null, '']) {
      const short = shorten(input);

      expect(short).to.be.a('string').that.equals('');
    }
  });

  it('should not shorten a short string', function () {
    const short = shorten('Some');

    expect(short).to.be.a('string').that.equals('Some');
  });

  it('should shorten a long string using default length', function () {
    const short = shorten('Some long string to shorten with many possible words to split into.');

    expect(short).to.be.a('string').that.equals('Some long string to shorten with many possible...');
  });

  it('should shorten a long string with arbitrary length', function () {
    const short = shorten('Some long string to shorten with arbitrary length.', {
      length: 20
    });

    expect(short).to.be.a('string').that.equals('Some long string...');
  });

  it('should shorten a long string with arbitrary length with custom ellipsis', function () {
    const short = shorten('Some long string to shorten with arbitrary length.', {
      ellipsis: '[+]',
      length: 20
    });

    expect(short).to.be.a('string').that.equals('Some long string[+]');
  });

  it('should shorten a long string with arbitrary length with custom ellipsis in lax mode', function () {
    const short = shorten('Some long string to shorten with arbitrary length.', {
      ellipsis: '[+]',
      length: 20,
      lax: true
    });

    expect(short).to.be.a('string').that.equals('Some long string to[+]');
  });

  it('should shorten a long string with arbitrary length with custom ellipsis and not keeping whole words', function () {
    const short = shorten('Some long string to shorten with arbitrary length.', {
      ellipsis: '[+]',
      words: false,
      length: 15
    });

    expect(short).to.be.a('string').that.equals('Some long st[+]');
  });

  it('should shorten a long string with arbitrary length with custom ellipsis and not keeping whole words in lax mode', function () {
    const short = shorten('Some long string to shorten with arbitrary length.', {
      ellipsis: '[+]',
      words: false,
      length: 15,
      lax: true
    });

    expect(short).to.be.a('string').that.equals('Some long strin[+]');
  });
});
