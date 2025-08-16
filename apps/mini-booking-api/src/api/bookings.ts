import { Hono } from 'hono';
import authMiddleware from '../middlewares/auth';
import type { Variables } from '../types/hono';

const api = new Hono<{ Variables: Variables }>();

api.use('/bookings/*', authMiddleware);

api.get('/bookings', (c) => {
  return c.json({
    data: 'yes',
    ok: true,
  });
});

api.post('/bookings', async (c) => {
  const user = c.get('userId');

  return c.json({
    message: 'Booking created successfully',
    user,
    ok: true,
  });
});

export default api;
