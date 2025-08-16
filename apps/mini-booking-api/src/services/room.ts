// ? Might be more cleaner to use a class. But for simplicity, we go with functions

import { TIME_SLOTS } from '../constants/time-slots';
import { bookings, rooms } from '../mock/data';
import type { GetRoomsResponse } from '../types/api/rooms';
import type { Booking, TimeSlot } from '../types/booking';
import type { Room } from '../types/room';
import { getTodayDate } from '../utils/get-today-date';

/**
 * This function retrieves all rooms, show its info, alongside the AVAILABLE time slots.
 * For availability, it will return the time slots that are not booked for today.
 */
export const getAllRoomsAndAvailability = (): GetRoomsResponse['data'] => {
  // Get all rooms
  const rooms = getAllRooms();

  // For each rooms, get the available time slots
  const results = rooms.map((room) => {
    const roomAvailableTimeSlots = getRoomAvailability({ roomId: room.id });

    return {
      ...room,
      availableTimeSlots: roomAvailableTimeSlots,
    };
  });

  return results;
};

export const getAllRooms = (): Room[] => {
  return rooms;
};

type GetRoomAvailabilityParams = {
  roomId: string;
  date?: string; // Optional date, if not provided, use today's date
};

/**
 * Based on the given roomId, check at what time slots is the room available.
 * Future enhancement would be to make it to accept a date range. For now, only check for today
 */
const getRoomAvailability = ({ roomId, date }: GetRoomAvailabilityParams) => {
  // Get today's room booking
  const roomBookings = getRoomBookingByDate({
    roomId,
    date: date ?? getTodayDate(),
  });

  // Use flatmap to create a new array of the booked time slots of the bookings
  const bookedTimeSlots = roomBookings.flatMap((booking) => booking.timeSlots);

  const fullDayTimeSlots: TimeSlot[] = getFullDayTimeSlots();

  // Then filter out the booked time slots from the full day
  const availableTimeSlots = fullDayTimeSlots.filter(
    (timeSlot) => !bookedTimeSlots.includes(timeSlot),
  );

  return availableTimeSlots;
};

const getFullDayTimeSlots = (): TimeSlot[] => {
  return Object.keys(TIME_SLOTS) as TimeSlot[];
};

type GetAllBookingsByDateParams = {
  roomId: string;
  date: string;
};

const getRoomBookingByDate = ({
  date,
  roomId,
}: GetAllBookingsByDateParams): Booking[] => {
  return bookings.filter(
    (booking) => booking.roomId === roomId && booking.date === date,
  );
};
