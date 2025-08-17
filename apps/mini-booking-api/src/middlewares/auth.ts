import { createMiddleware } from 'hono/factory';
import { X_USER_ID } from '../constants/headers';
import type { Variables } from '../types/hono';

const authMiddleware = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const userId = c.req.header(X_USER_ID);

    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // TODO: Check if user exists in our "database"

    c.set('userId', userId); // Store userId in context for later use
    await next();
  },
);

export default authMiddleware;
