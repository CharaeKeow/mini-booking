import { bookings, rooms } from '../mock/data';
import type { GetUserBookingResponse } from '../types/api/bookings';
import type { Booking, TimeSlot } from '../types/booking';
import type { Room } from '../types/room';
import { getTodayDate } from '../utils/get-today-date';
import { getRoomBookingByDate } from './room';

type GetUserBookingParams = {
  userId: string;
  date?: string;
};

export const getUserBookings = ({
  userId,
  date = getTodayDate(),
}: GetUserBookingParams): GetUserBookingResponse['data'] => {
  // Return bookings that belong to user id
  const userBookings = bookings.filter(
    (booking) => booking.userId === userId && booking.date === date,
  );

  // JOIN with rooms to get room details. Again, would be simpler if I use DB here
  const bookingsWithRoomDetails = userBookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId) as Room; // By right room won't be undefined, since our data would have roomId that exists in rooms

    return {
      ...booking,
      room,
    };
  });

  return bookingsWithRoomDetails;
};

type CreateBookingParams = {
  userId: string;
  roomId: string;
  timeSlots: TimeSlot[];
  date?: string; // Default to today for now. Since for simplicity, we constraint our app to only allow booking for today
};

export const createBooking = ({
  userId,
  roomId,
  timeSlots,
  date = getTodayDate(),
}: CreateBookingParams) => {
  const newBooking: Booking = {
    id: `${bookings.length + 1}`,
    roomId,
    userId,
    timeSlots,
    date,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
};

type CheckRoomAvailabilityParams = Pick<
  CreateBookingParams,
  'roomId' | 'timeSlots' | 'date'
>;

export const checkRoomAvailability = ({
  roomId,
  timeSlots,
  date = getTodayDate(),
}: CheckRoomAvailabilityParams) => {
  const roomBookings = getRoomBookingByDate({ date, roomId });

  // Use flatmap to create a new array of the booked time slots of the bookings
  const bookedTimeSlots = roomBookings.flatMap((booking) => booking.timeSlots);

  // Check if any of the requested time slots has conflict with the booked time slots
  const hasConflictingTimeSlots = timeSlots.some((timeSlot) =>
    bookedTimeSlots.includes(timeSlot),
  );

  return !hasConflictingTimeSlots; // If there is no conflict, means the room is available
};

/**
 * A scrapy function to validate the body. In production app we would use zod instead.
 * TODO: Will refactor to use zod if time permits
 */
export const validateCreateBookingBody = (body: unknown) => {
  if (
    typeof body === 'object' &&
    body !== null &&
    'roomId' in body &&
    'timeSlots' in body &&
    'date' in body &&
    typeof body.roomId === 'string' &&
    typeof body.roomId === 'string' &&
    Array.isArray(body.timeSlots)
  ) {
    return body as Omit<CreateBookingParams, 'userId'>; // Type assertion to CreateBookingParams
  }

  return undefined;
};
