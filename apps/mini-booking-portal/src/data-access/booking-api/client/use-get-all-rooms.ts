import { NEXT_API_URL } from '@/constants/api';
import { GetRoomsResponse } from '@/types/api/booking-api';
import { useQuery } from '@tanstack/react-query';

const ROOMS_NEXT_API_URL = NEXT_API_URL + '/rooms';

export function useGetAllRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch(ROOMS_NEXT_API_URL);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = (await response.json()) as GetRoomsResponse;

      return result.data;
    },
  });
}
