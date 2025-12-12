# PocketFinds

Simple project for browsing local food stalls.

## Run locally

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Env (examples):
```
backend/.env:
MONGO_URI=mongodb://localhost:27017/pocketfinds
JWT_SECRET=dev
PORT=5000

frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
