'use client';

import { TIME_SLOTS } from '@/constants/time-slots';
import { useGetAllRooms } from '@/data-access/booking-api/client/use-get-all-rooms';
import { TimeSlotButton } from './time-slot-button';

// type RoomsViewProps = {};

export const RoomsView = () => {
  const { data, isLoading, error } = useGetAllRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-8">
      <h1>Today Available Rooms</h1>
      {data &&
        data.map((room) => {
          const { id: roomId, availableTimeSlots, name, capacity } = room;

          return (
            <div key={roomId} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{name}</h2>
              <p>Capacity: {capacity}</p>
              <h3 className="mt-2">Time Slots:</h3>
              <div className="space-y-0.5">
                {Object.entries(TIME_SLOTS).map(([key, value]) => {
                  // TODO: This is a quick, not so elegant fix. Will change to another way as future enhancement
                  const typedKey = key as keyof typeof TIME_SLOTS;
                  const isAvailable = availableTimeSlots.includes(typedKey);

                  return (
                    <TimeSlotButton
                      key={key}
                      value={value}
                      isAvailable={isAvailable}
                      roomId={roomId}
                      timeSlot={typedKey}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      <div></div>
    </div>
  );
};
