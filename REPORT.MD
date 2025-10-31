## Project Report

### Rendering Strategy Rationale

**SSG for Home Page:**
Chosen because the product catalog is read-heavy and doesn't require real-time updates

**ISR for Product Details:**
Balances static performance with data freshness. Products get updated every 60 seconds

**SSR for Dashboard:**
Critical for admin dashboard where inventory accuracy is essential

*CSR for Admin Panel:**
Provides best UX for interactive forms and immediate feedback


### Data Flow

1. **Build Time:** SSG pre-renders home page with all products
2. **Request Time:** ISR serves cached product pages, regenerates after 60s
3. **Real-time:** Dashboard fetches fresh data on every request
4. **Client-side:** Admin panel manages state and calls API routes

### Challenges & Solutions

**Challenge 1:** MongoDB connection in serverless environment
- **Solution:** Used connection pooling with cached connection

**Challenge 2:** Form validation for product creation
- **Solution:** Implemented React Hook Form with Zod schema

**Challenge 3:** Ensuring SSR works correctly
- **Solution:** Added `export const dynamic = 'force-dynamic'`


### Screenshots
Page (/) - <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/ee43b232-34f3-40b6-8435-fe0a470ec7b8" /> 

Page (/products/[slug]) =  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/5145fceb-514f-44c3-8ed6-8dc4c09d1c56" /> 

Page (dashboard) - <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/cb876a4f-90ef-4bae-a1ec-50accbbbb17c" /> 

Page (Admin) - <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/deda6670-8484-4a2a-a803-c32354313529" />

Page (recommendations) - <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a1394e51-ffd3-4987-84e2-073974da7867" />




