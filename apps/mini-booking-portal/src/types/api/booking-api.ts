// ? For future enhancement, we should make it so that these duplicated type are shared with the BE repo - either via a shared type package, or Typespec for instance

import type { Booking } from '../booking';
import type { Room } from '../room';

import type { TimeSlot } from '../booking';

type GetUserBookingResponseData = Booking & {
  room: Room;
};

export type GetUserBookingResponse = {
  data: GetUserBookingResponseData[];
};

type RoomsWihAvailability = Room & {
  availableTimeSlots: TimeSlot[];
};

export type GetRoomsResponse = {
  data: RoomsWihAvailability[];
};
