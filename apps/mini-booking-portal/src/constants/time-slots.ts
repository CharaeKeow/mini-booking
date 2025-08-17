// For type safety, the time slots is being defined as key-value pairs, since our time slots are hour-based and only from (0900 - 1800)
// This would be different if we have more free time slot - e.g. can book from 9.30 am to 10.45 am.
// For now, will go with this since it's simplest
// The key is the start time of the slot. The value is the human-readable format of the time slot.
export const TIME_SLOTS = {
  '09:00': '09:00 - 10:00',
  '10:00': '10:00 - 11:00',
  '11:00': '11:00 - 12:00',
  '12:00': '12:00 - 13:00',
  '13:00': '13:00 - 14:00',
  '14:00': '14:00 - 15:00',
  '15:00': '15:00 - 16:00',
  '16:00': '16:00 - 17:00',
  '17:00': '17:00 - 18:00',
} as const;
