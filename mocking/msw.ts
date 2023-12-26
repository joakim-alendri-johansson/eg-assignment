import { setupWorker } from 'msw/browser';
import { handlers } from './mocking';

export const worker = setupWorker(...handlers);
