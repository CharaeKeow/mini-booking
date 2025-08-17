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

## Development Logs

### Assumptions

1. Each booking reserves the entire room for the specified time range
2. The system only handle booking for today.

### Room Booking Handling

The main key question for this project is the design of the handling of room time slots for booking. I have considered a few approaches:

1. **Store the time slots as an array:**
   I have been debating with myself whether this is the right approach. It does look simple, but at the same time I am not sure whether it is the most efficient, and would scale well. However, implementation wise it's the simplest and I chose to go with this.

   How it works is quite simple. Since the time slots are fixed and are hour-based (between 9 am to 6 pm), and one slot is one hour, we can just store the start time of for each slot in an array.

   For example:
   - Booking from 9 am to 10 am will be stored as `["09:00"]`
   - Booking from 9 am to 11 am will be stored as `["09:00", "10:00"]`

   **Note:** Current implementation only supports consecutive time slots. For non-consecutive bookings (e.g., 9-10am + 2-3pm), users would need to make separate booking requests.

   With this, the collision checking would be straight forward, since we just have to check that the booking time slot does not overlap with any existing time slots in the array.

2. Store the `startTime` and `endTime` of the booking as a range, and then check for conflicts when booking a room. This is a more elegant approach and the one that I will choose for production app.

### Time Constraint Decisions

- In-memory storage instead of database (rapid prototyping)
- Consecutive slots only (simplified collision logic)
- Fixed hourly slots

### Shared Packages

By right, since this is monorepo, we should consolidate all the configs (ESLint, Prettier, TS config, etc.) into the shared packages. However, due to time constraints, this is skipped for now.

## Known Issues

### 1. Waring when installing packages

The following warning appears when installing packages:

```

|  WARN  `node_modules` is present. Lockfile only installation will make it out-of-date

```

### Future Improvements

- [ ] Replace in-memory storage with PostgreSQL
- [ ] Implement proper authentication
- [ ] Add input validation with Zod
- [ ] Support multi-day bookings
- [ ] Add comprehensive error handling
