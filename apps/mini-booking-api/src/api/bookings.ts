import { Hono } from 'hono';
import authMiddleware from '../middlewares/auth';
import type { Variables } from '../types/hono';
import {
  checkRoomAvailability,
  createBooking,
  getUserBookings,
  validateCreateBookingBody,
} from '../services/booking';

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
  const userId = c.get('userId');

  const body = await c.req.json();

  // IRL we would use validation library like zod to validate the body
  const validatedBody = validateCreateBookingBody(body);

  if (validatedBody === undefined) {
    return c.json(
      {
        message: 'Invalid request body',
      },
      422,
    );
  }

  const isRoomTimeSlotAvailable = checkRoomAvailability(validatedBody);

  if (!isRoomTimeSlotAvailable) {
    return c.json(
      {
        message: 'Room is not available for the selected time slots',
      },
      422,
    );
  }

  createBooking({ ...validatedBody, userId });

  return c.json({
    message: 'Booking created successfully',
    ok: true,
  });
});

export default api;
