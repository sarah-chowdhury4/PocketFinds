# PocketFinds AI Agent Instructions

## Project Overview
**PocketFinds** is a full-stack local food stall discovery platform connecting students/customers with neighborhood food stalls. It includes admin analytics, stall owner management, and trust-based user systems.

- **Frontend**: Next.js 13+ (App Router) with TypeScript and Radix UI components
- **Backend**: Node.js/Express with MongoDB (Mongoose ODM)
- **Root scripts** manage both services via `cd frontend/` and `cd backend/` directories

## Architecture & Data Flow

### Key Service Boundaries
1. **API Layer** ([backend/routes/](backend/routes/), [backend/controllers/](backend/controllers/))
   - REST endpoints: `/api/user` (auth), `/api/menu` (stalls), `/api/dashboard` (admin analytics)
   - Port: `process.env.PORT` (see `.env` for configuration)

2. **Authentication** ([backend/middleware/auth.js](backend/middleware/auth.js))
   - JWT tokens with Bearer scheme: `Authorization: Bearer <token>`
   - Token payload: `{ uid, role, userId, iat, exp }`
   - Three roles: `customer`, `stall_owner`, `admin`
   - Frontend context: [frontend/src/lib/auth-context.tsx](frontend/src/lib/auth-context.tsx) (currently mocked for dev)

3. **Data Models** ([backend/models/](backend/models/))
   - **User**: email, password, phone, first_name, last_name, type (role)
   - **Stall**: owner_id, stall_name, stall_location, discount, offer, items (menu array)
   - **Item**: menu items with pricing (see itemController.js)
   - **TrustPoints**: user reputation system (see trustPoints.model.js)
   - Timestamps auto-added via Mongoose schema `timestamps: true`

Notes removed.
   - Layout: Header, Sidebar, BottomNav (responsive navigation)
