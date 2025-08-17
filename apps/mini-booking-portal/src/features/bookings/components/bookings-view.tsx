'use client';

import { useGetUserBookings } from '@/data-access/booking-api/client/use-get-user-bookings';
import { getTimeSlotDisplayValue } from '../utils/get-time-slot-display-value';

export const BookingsView = () => {
  const { data, error, isLoading } = useGetUserBookings();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-8">
      <h1>User Bookings</h1>

      <div className="space-y-2">
        {data &&
          data.map((booking) => {
            const { id: bookingId, room, date, timeSlots, createdAt } = booking;

            return (
              <div key={bookingId} className="rounded-md p-4 bg-blue-50">
                <h2>{room.name}</h2>
                <p>
                  {/* <span className="font-bold">Time Slots: </span> */}
                  <BookingInfoHeader text="Time Slots: " />
                  {/* Choose to handle like this since our time slot is an array. Despite we can only book one slot at a time */}
                  {/* TODO: Come back and clean this up */}
                  {timeSlots
                    .map((timeSlot) => getTimeSlotDisplayValue(timeSlot))
                    .join(', ')}
                </p>
                <p>
                  <BookingInfoHeader text="Date: " />
                  {formatDate({ date, format: 'date' })}
                </p>
                <p>
                  <BookingInfoHeader text="Booked at: " />
                  {formatDate({ date: createdAt, format: 'dateTime' })}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const BookingInfoHeader = ({ text }: { text: string }) => (
  <span className="font-bold">{text}</span>
);

type FormatDateParams = {
  date: string;
  format?: 'date' | 'dateTime';
};

const formatDate = ({ date, format = 'dateTime' }: FormatDateParams) => {
  switch (format) {
    case 'date':
      return new Date(date).toLocaleDateString();
    case 'dateTime':
      return new Date(date).toLocaleString();
  }
};
