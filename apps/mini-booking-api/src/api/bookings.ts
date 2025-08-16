import { Hono } from 'hono';
import authMiddleware from '../middlewares/auth';
import type { Variables } from '../types/hono';
import { getUserBookings } from '../services/booking';

const api = new Hono<{ Variables: Variables }>();

api.use('/bookings/*', authMiddleware);

api.get('/bookings', (c) => {
  const userId = c.get('userId');

  const userBookings = getUserBookings({ userId });

  return c.json({
    data: userBookings,
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
