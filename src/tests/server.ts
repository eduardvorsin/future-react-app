import { rest } from 'msw';
import { setupServer } from 'msw/node';
import dummyBooksError from './dummyBooksError';
import dummyBooks from './dummyBooks';
import dummyDefiniteBook from './dummyDefiniteBook';
import dummyDefiniteBookError from './dummyDefiniteBookError';

const handlers = [
  rest.get('https://www.googleapis.com/books/v1/volumes', (req, res, ctx) => res(ctx.json(dummyBooks))),
  rest.get('https://www.googleapis.com/books/v1/volumes/:id', (req, res, ctx) => res(ctx.json(dummyDefiniteBook))),
];

const errorHandlers = [
  rest.get('https://www.googleapis.com/books/v1/volumes', (req, res, ctx) => res(ctx.status(400), ctx.json(dummyBooksError))),
  rest.get('https://www.googleapis.com/books/v1/volumes/:id', (req, res, ctx) => res(ctx.status(404), ctx.json(dummyDefiniteBookError))),
];

const server = setupServer(...handlers);
export const setupServerWithErrors = () => server.use(...errorHandlers);

export default server;
