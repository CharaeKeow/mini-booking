import { bookings, rooms } from '../mock/data';
import type { GetUserBookingResponse } from '../types/api/bookings';
import type { Room } from '../types/room';
import { getTodayDate } from '../utils/get-today-date';

type GetUserBookingParams = {
  userId: string;
  date?: string;
};

const TODAY_DATE = getTodayDate();

export const getUserBookings = ({
  userId,
  date = TODAY_DATE,
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
