# 🎨 Stockly Frontend – Next.js App

This repository contains the **frontend** of the Stockly project, built with **Next.js**.  
It integrates authentication with HttpOnly cookies, manages global state with Redux, and consumes the backend API with React Query.

---

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) – App Router + Turbopack
- [React Query](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Axios](https://axios-http.com/)

---

## ⚙️ Features

- ✅ Login/Logout integrated with backend
- ✅ Session validation via HttpOnly cookie
- ✅ Global state management with Redux (`user`, roles)
- ✅ Session rehydration via `/auth/me`
- ✅ Next.js middleware protecting private routes (`/dashboard`, `/products`, `/users`)
- ✅ React Query for data fetching and caching (products, categories, users)
- ✅ Responsive UI with Tailwind + Radix

---

## 📂 Project Structure

```
src/
 ├── app/
 │    ├── login/        # Login page
 │    ├── dashboard/    # Protected dashboard
 │    ├── products/     # Products page
 │    ├── categories/   # Categories page
 │    ├── users/        # Users page
 │    └── layout.tsx    # Root layout
 ├── components/        # Header, containers, UI
 ├── hooks/             # React Query hooks
 ├── redux/             # Redux Toolkit store and slices
 ├── lib/               # Axios and providers
 └── middleware.ts      # JWT route protection
```

---

## 🛠️ How to Run

```bash
cd stockly-frontend
yarn install
cp .env.example .env
yarn dev
```

---

## 🔐 Authentication Flow

1. User accesses `/login` and submits credentials
2. Backend returns JWT in HttpOnly cookie
3. Frontend rehydrates Redux state via `/auth/me`
4. Next.js middleware redirects unauthenticated users to `/login`
5. Logout clears backend cookie and Redux state
