import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import roomsApi from './api/rooms';
import bookingsApi from './api/bookings';

const PORT = process.env.PORT ?? 8080; // TODO: To make env type safe by using package like https://github.com/t3-oss/t3-env

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api', roomsApi);
app.route('/api', bookingsApi);

serve(
  {
    fetch: app.fetch,
    port: PORT as number, // This is ugly. But it's no needed if we make env type safe
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
