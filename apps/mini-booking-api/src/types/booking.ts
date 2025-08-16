import type { TIME_SLOTS } from '../constants/time-slots';

export type TimeSlot = keyof typeof TIME_SLOTS;

export type Booking = {
  id: string;
  roomId: string;
  userId: string;
  /**
   * ? For simplicity, we are only storing the start time of the booking. E.g. `["10.00"]` means the booking starts at 10:00 am and ends at 11:00 am.
   * And `["10.00", "11.00"]` means the booking starts at 10:00 am and ends at 12:00 pm.
   */
  timeSlots: TimeSlot[];
  date: string;
  createdAt: string; // ISO date string
};
