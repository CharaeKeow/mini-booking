'use client';

import { useGetAllRooms } from '@/data-access/booking-api/client/rooms';

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
          const { id, availableTimeSlots, name, capacity } = room;

          return (
            <div key={id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{name}</h2>
              <p>Capacity: {capacity}</p>
              {/* TODO: Implement Room availability */}
              <h3 className="mt-2">Time Slots:</h3>
              {availableTimeSlots.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          );
        })}
      <div></div>
    </div>
  );
};
