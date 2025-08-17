import { cn } from '@/utils/cn';

type TimeSlotButtonProps = {
  isAvailable: boolean;
  value: string;
};

export const TimeSlotButton = ({ isAvailable, value }: TimeSlotButtonProps) => {
  return (
    <button
      className={cn(
        'block p-1 w-[120px] cursor-pointer bg-green-300 rounded-sm',
        !isAvailable && 'bg-red-200 cursor-not-allowed',
      )}
      disabled={!isAvailable}
    >
      {value}
    </button>
  );
};
