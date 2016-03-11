import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {Apply} from './apply';

describe('Apply', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Apply
  ]);

  it('should default noMiddleName to false', inject([ Apply ], (apply) => {
    expect(apply.noMiddleName).toEqual(false);
  }));

});
