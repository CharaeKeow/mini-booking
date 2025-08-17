import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import roomsApi from './api/rooms';
import bookingsApi from './api/bookings';

// TODO: To make env type safe by using package like https://github.com/t3-oss/t3-env
const parsedPortNumber = Number(process.env.PORT);
const PORT = Number.isNaN(parsedPortNumber) ? 8080 : parsedPortNumber;

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api', roomsApi);
app.route('/api', bookingsApi);

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
