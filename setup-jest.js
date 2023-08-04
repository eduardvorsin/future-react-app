import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import server from './src/tests/server';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
});

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
