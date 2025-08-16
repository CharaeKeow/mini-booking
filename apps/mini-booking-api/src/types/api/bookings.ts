import type { TimeSlot } from '../booking';
import type { Room } from '../room';

type RoomsWihAvailability = Room & {
  availableTimeSlots: TimeSlot[];
};

export type GetRoomsResponse = {
  data: RoomsWihAvailability[];
};
