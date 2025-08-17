import { BOOKING_API_URL } from '@/constants/api';
import { GetUserBookingResponse } from '@/types/api/booking-api';
import { ApiResponse } from '@/types/api/response';
import { getAuthHeader } from '@/utils/get-auth-header';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<ApiResponse<GetUserBookingResponse['data']>>> => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const apiUrl = `${BOOKING_API_URL}/bookings${searchParams ? `?${searchParams}` : ''}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const result = (await response.json()) as GetUserBookingResponse;

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (error) {
    console.error('Bookings GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const response = await fetch(`${BOOKING_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Bookings POST error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
