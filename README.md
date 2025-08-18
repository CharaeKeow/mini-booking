# Mini Booking System

Monorepo created using [pnpm workspace](https://pnpm.io/workspaces)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start backend (port 8080)
pnpm dev:api

# Start frontend (port 3000)
pnpm dev:web
```

## Environment Setup

Copy `.env.example` to `.env` in both apps and adjust values as needed for your environment. However this step can be skipped since we already have the default fallback values if there's no `env` file

## Tech Stack

**Backend:**

- Hono (Never used it, but curious and want to play with it)
- TypeScript
- In-memory data storage for DB

**Frontend:**

- Next.js
- React Query
- Tailwind CSS
- TypeScript

**Monorepo:**

- pnpm workspaces

## API Endpoints

- `GET /api/rooms` - Get all rooms with today's availability
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings?userId={id}` - Get user's bookings

**Headers:** All requests require `x-user-id` header for authentication simulation.

## API Examples

### Get All Rooms with Availability

```bash
curl -X GET http://localhost:8080/api/rooms \
  -H "x-user-id: 3"
```

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Small Meeting Room A",
      "capacity": 2,
      "availableTimeSlots": ["10:00", "12:00", "16:00"]
    }
  ]
}
```

### Create a Booking

```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "x-user-id: 3" \
  -H "Content-Type: application/json" \
  -d '{"roomId": "1", "timeSlots": ["09:00"]}'
```

**Response:**

```json
{
  "message": "Booking created successfully",
  "ok": true
}
```

**Error Response (Conflict):**

```json
{
  "message": "Room is not available for the selected time slots"
}
```

### Get User Bookings

```bash
curl -X GET http://localhost:8080/api/bookings \
  -H "x-user-id: 3"
```

**Response:**

```json
{
  "data": [
    {
      "id": "4",
      "roomId": "1",
      "userId": "3",
      "timeSlots": ["09:00"],
      "date": "2025-08-18",
      "createdAt": "2025-08-18T10:30:00.000Z",
      "room": {
        "id": "1",
        "name": "Small Meeting Room A",
        "capacity": 2
      }
    }
  ]
}
```

## Development Logs

### Assumptions

1. Each booking reserves the entire room for the specified time range
2. The system only handles booking for today.

### Room Booking Handling

The main design question for this project was how to handle room time slots for booking. I considered a few approaches and chose the array-based storage for its simplicity, though I debated whether it would be the most efficient for scaling.

#### Time Slot Storage Approach

Since time slots are fixed and hour-based (9 AM to 6 PM), I store bookings as an array of start times for each slot.

**Examples:**

- Booking 9 AM to 10 AM: `["09:00"]`
- Booking 9 AM to 11 AM: `["09:00", "10:00"]`
- Booking 2 PM to 5 PM: `["14:00", "15:00", "16:00", "17:00"]`

#### How Conflict Detection Works

```
Room A has existing bookings:
- Booking 1: ["09:00", "10:00"] (9-11 AM)
- Booking 2: ["15:00"] (3-4 PM)

Algorithm:
1. Collect all booked slots: ["09:00", "10:00", "15:00"]
2. Check if requested slot exists in this flattened array
3. If exists → Conflict ❌ | If not → Available ✅

Time Slot Status:
09:00-10:00: ❌ BOOKED
10:00-11:00: ❌ BOOKED
11:00-12:00: ✅ AVAILABLE
12:00-13:00: ✅ AVAILABLE
15:00-16:00: ❌ BOOKED
```

This straightforward collision checking works by flattening all existing bookings into a single array, then checking if the requested time slot overlaps with any existing slot.

#### Frontend vs Backend Implementation

**Important Note:**

- **Backend supports**: Multi-consecutive slot bookings (e.g., `["09:00", "10:00", "11:00"]`)
- **Frontend implements**: Single-slot booking (clicking one slot attempts to book it)
- **User workflow**: For consecutive slots, users make multiple individual bookings
- **Architecture benefit**: Backend design supports both approaches without modification

#### Alternative Approach Considered

I also considered storing `startTime` and `endTime` as ranges and checking for overlaps. This is more elegant and what I'd choose for a production app, but the array approach proved simpler to implement and reason about for this assessment scope.

### Time Constraint Decisions

- In-memory storage instead of database (rapid prototyping)
- Single-slot UI booking (matches requirements, even though the backend supports multi-consecutive-slot)
- Fixed hourly slots

### Shared Packages

By right, since this is monorepo, we should consolidate all the configs (ESLint, Prettier, TS config, etc.) into the shared packages. However, due to time constraints, this is skipped for now.

## Known Issues

### 1. Warning when installing packages

The following warning appears when installing packages:

```
|  WARN  `node_modules` is present. Lockfile only installation will make it out-of-date
```

## Future Improvements

- [ ] Replace in-memory storage with PostgreSQL
- [ ] Implement proper authentication
- [ ] Add input validation with Zod
- [ ] Support multi-day bookings
- [ ] Add comprehensive error handling
- [ ] Open API (and TypeSpec for type sharing)
