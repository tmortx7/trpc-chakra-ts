/**
 * This file contains the root router of your tRPC-backend
 */
 import { t } from '../trpc';
import { areaRouter } from './area';
 import { healthRouter } from './health';
import { siteRouter } from './site';

 export const appRouter = t.router({
   health: healthRouter,
   site: siteRouter,
   area: areaRouter,
 });

 export type AppRouter = typeof appRouter;