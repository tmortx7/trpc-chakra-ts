/**
 * This file contains the root router of your tRPC-backend
 */
 import { t } from '../trpc';
 import { healthRouter } from './health';
import { siteRouter } from './site';

 export const appRouter = t.router({
   health: healthRouter,
   site: siteRouter,
 });

 export type AppRouter = typeof appRouter;