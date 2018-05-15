/* eslint-env node, jest */
import request from './request';

test('has $http', () => {
  expect(request.$http).toBeDefined();
});

test('has $http.get', () => {
  expect(request.$http.get).toBeDefined();
});

test('has $http.post', () => {
  expect(request.$http.post).toBeDefined();
});

test('has $http.put', () => {
  expect(request.$http.put).toBeDefined();
});
