import { cn } from '@/utils/cn';
import { useCreateBooking } from '@/data-access/booking-api/client/use-create-booking';

type TimeSlotButtonProps = {
  isAvailable: boolean;
  value: string;
  roomId: string;
  timeSlot: string;
};

export const TimeSlotButton = ({
  isAvailable,
  value,
  roomId,
  timeSlot,
}: TimeSlotButtonProps) => {
  const createBookingMutation = useCreateBooking();

  const handleBooking = () => {
    createBookingMutation.mutate(
      {
        roomId,
        timeSlots: [timeSlot],
      },
      {
        onSuccess: () => {
          alert('Booking created successfully!');
        },
        onError: (error) => {
          alert(`Booking failed: ${error.message}`);
        },
      },
    );
  };

  return (
    <button
      className={cn(
        'block p-1 w-[120px] cursor-pointer bg-green-300 rounded-sm',
        !isAvailable && 'bg-red-200 cursor-not-allowed',
        createBookingMutation.isPending && 'bg-yellow-300 cursor-wait',
      )}
      disabled={createBookingMutation.isPending}
      onClick={handleBooking}
    >
      {createBookingMutation.isPending ? 'Booking...' : value}
    </button>
  );
};
