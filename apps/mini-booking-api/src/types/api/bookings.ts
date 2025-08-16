import type { Booking } from '../booking';
import type { Room } from '../room';

type GetUserBookingResponseData = Booking & {
  room: Room;
};

export type GetUserBookingResponse = {
  data: GetUserBookingResponseData[];
};
