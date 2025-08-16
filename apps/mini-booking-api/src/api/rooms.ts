import { Hono } from 'hono';
import { getAllRoomsAndAvailability } from '../services/room';
import authMiddleware from '../middlewares/auth';

const api = new Hono();

api.use('/rooms/*', authMiddleware);

api.get('/rooms', (c) => {
  const results = getAllRoomsAndAvailability();

  return c.json({
    data: results,
  });
});

export default api;
