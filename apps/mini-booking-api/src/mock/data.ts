// Store all of our mock data here. IRL this wouldn't exist since we'd use DB instead :)

import type { Booking } from '../types/booking';
import type { Room } from '../types/room';
import type { User } from '../types/user';

export const users: User[] = [
  {
    id: '1',
    name: 'John',
    email: 'john@meeting.com',
  },
  {
    id: '2',
    name: 'Hawking',
    email: 'hawking@meeting.com',
  },
  {
    id: '3', // This is the current FE user. Since we don't have any auth for simplicity
    name: 'Federico',
    email: 'federico@gmail.com',
  },
];

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Small Meeting Room A',
    capacity: 2,
  },
  {
    id: '2',
    name: 'Big Room B',
    capacity: 60,
  },
  {
    id: '3',
    name: 'Training Room C',
    capacity: 20,
  },
];

export const bookings: Booking[] = [
  {
    id: '1',
    roomId: '1',
    userId: '1',
    timeSlots: ['09:00', '10:00'],
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    roomId: '3',
    userId: '1',
    timeSlots: ['17:00'],
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    roomId: '1',
    userId: '2',
    timeSlots: ['13:00', '14:00', '15:00', '16:00', '17:00'],
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    roomId: '2',
    userId: '3',
    timeSlots: ['10:00'],
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    roomId: '2',
    userId: '3',
    timeSlots: ['11:00'],
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
];
