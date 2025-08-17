import { BOOKING_API_URL } from '@/constants/booking-api';
import { GetRoomsResponse } from '@/types/api/booking-api';
import { ApiResponse } from '@/types/api/response';
import { getAuthHeader } from '@/utils/get-auth-header';
import { NextResponse } from 'next/server';

const GET_ALL_ROOMS_API_URL = `${BOOKING_API_URL}/rooms`;

export const GET = async (): Promise<
  NextResponse<ApiResponse<GetRoomsResponse['data']>>
> => {
  try {
    const response = await fetch(GET_ALL_ROOMS_API_URL, {
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message: 'Failed to fetch rooms',
        },
        { status: response.status },
      );
    }

    const result = (await response.json()) as GetRoomsResponse;

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { message: 'Failed to fetch rooms' },
      { status: 500 },
    );
  }
};
