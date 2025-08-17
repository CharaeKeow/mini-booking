import { TIME_SLOTS } from '@/constants/time-slots';
import { TimeSlot } from '@/types/booking';

export const getTimeSlotDisplayValue = (timeSlot: TimeSlot) => {
  return TIME_SLOTS[timeSlot];
};
