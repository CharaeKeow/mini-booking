import { Hono } from 'hono';

const api = new Hono();

api.get('/rooms', (c) => {
  return c.json({
    data: 'yes',
    ok: true,
  });
});

export default api;
