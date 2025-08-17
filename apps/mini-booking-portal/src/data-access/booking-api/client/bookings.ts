import { NEXT_API_URL } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BOOKINGS_NEXT_API_URL = NEXT_API_URL + '/bookings';

type CreateBookingParams = {
  roomId: string;
  timeSlots: string[];
  date?: string;
};

type CreateBookingResponse = {
  message: string;
  ok: boolean;
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: CreateBookingParams,
    ): Promise<CreateBookingResponse> => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      const response = await fetch(BOOKINGS_NEXT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: params.roomId,
          timeSlots: params.timeSlots,
          date: params.date || today,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
