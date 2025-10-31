
**Name:** Athashri Keny  
**Date:** October 31, 2025  
**Assignment:** Next.js Rendering Strategies Assigment

## 🔗 Links

- **Live Deployment:** https://full-stack-assigment.vercel.app/
- **GitHub Repository:** https://github.com/athashri-keny/full-stack-assigment

## 🎯 Overview
- **SSG** (Static Site Generation) - Home Page
- **ISR** (Incremental Static Regeneration) - Product Detail Pages
- **SSR** (Server-Side Rendering) - Inventory Dashboard
- **CSR** (Client-Side Rendering) - Admin Panel
  
## 🎯 In detail
- ### 1. Home Page (`/`) - SSG (Static Site Generation)
- **Why:** Product catalog doesn't change frequently, SSG provides best performance
- **Implementation:** Data fetched at build time, no revalidation
- **Benefits:** Fast loading, SEO-friendly, cached CDN delivery

  ### 2. Product Detail (`/products/[slug]`) - ISR (Incremental Static Regeneration)
- **Why:** Product details (price, inventory) need periodic updates
- **Implementation:** `revalidate: 60` - updates every 60 seconds
- **Benefits:** Balance between static performance and fresh data

  ### 3. Dashboard (`/dashboard`) - SSR (Server-Side Rendering)
- **Why:** Admin needs real-time inventory statistics
- **Implementation:** `export const dynamic = 'force-dynamic'`
- **Benefits:** Always fresh data, secure for admin operations

### 4. Admin Panel (`/admin`) - CSR (Client-Side Rendering)
- **Why:** Interactive CRUD operations require client-side state management
- **Implementation:** `"use client"` with useEffect and fetch
- **Benefits:** Dynamic forms, instant feedback, API integration

## API Routes

- `GET /api/products` - Fetch all products
- `GET /api/products/[slug]` - Fetch single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/[id]` - Update product (protected)

## Technologies Used

- Next.js 14/15 (App Router)
- TypeScript
- MongoDB + Mongoose
- React Hook Form + Zod
- Tailwind CSS


## Admin Access

Use the admin key set in `.env.local` to access protected routes.

## instructions to run this project
- npm install
- npm run dev
