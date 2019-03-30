'use strict';

const { expect } = require('chai');

const Validation = require('../index');

describe('unit tests', () => {
  it('allows valid uid', () => {
    expect(Validation.CONSTANTS.UID.MAX_LENGTH).to.gte('FYInHn1mniQz3rCW0YXRNfLqyFv2'.length);
    expect(Validation.CONSTANTS.UID.PATTERN.test('FYInHn1mniQz3rCW0YXRNfLqyFv2')).to.eql(true);
  });

  it('excludes bad uid', () => {
    expect(Validation.CONSTANTS.UID.PATTERN.test('FYInHn1m   niQz3rCW0YXRNfLqyFv2')).to.eql(false);
  });

  it('allows valid project id', () => {
    expect(Validation.PROJECT.ID.MIN_LENGTH).to.lte('PPBqWA9'.length);
    expect(Validation.PROJECT.ID.MAX_LENGTH).to.gte('PPBqWA9'.length);
    expect(Validation.PROJECT.ID.PATTERN.test('PPBqWA9')).to.eql(true);
  });

  it('excludes invalid project id', () => {
    expect(Validation.PROJECT.ID.PATTERN.test('PPBq   WA9')).to.eql(false);
  });

  it('allows valid project name', () => {
    expect(Validation.PROJECT.NAME.MIN_LENGTH).to.eql(5);
    expect(Validation.PROJECT.NAME.MAX_LENGTH).to.gte('some-nice-name'.length);
    expect(Validation.PROJECT.NAME.PATTERN.test('some-nice-name')).to.eql(true);
  });

  it('excludes invalid project name', () => {
    expect(Validation.PROJECT.NAME.MIN_LENGTH).to.gte('foo'.length);
    expect(Validation.PROJECT.NAME.PATTERN.test('bad name $')).to.eql(false);
  });

  it('allows valid billing name', () => {
    expect(Validation.PROJECT.BILLING.NAME.MAX_LENGTH).to.gte('some-nice-name'.length);
  });
});
