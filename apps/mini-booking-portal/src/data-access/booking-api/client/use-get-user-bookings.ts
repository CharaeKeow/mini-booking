import { NEXT_API_URL } from '@/constants/api';
import { GetUserBookingResponse } from '@/types/api/booking-api';
import { useQuery } from '@tanstack/react-query';

const GET_USER_BOOKINGS_NEXT_APU_URL = NEXT_API_URL + '/bookings';

export const useGetUserBookings = () => {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: async () => {
      const response = await fetch(GET_USER_BOOKINGS_NEXT_APU_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch user bookings');
      }

      const result = (await response.json()) as GetUserBookingResponse;

      return result.data;
    },
  });
};
