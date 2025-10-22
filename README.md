# Social Web App

## My Approach & Design Decisions

### **1. Backend-first mindset (API as a clean data layer)**

Even though everything runs in one Next.js project, I designed the `/api/users` route to act like a standalone backend service.
It fetches data from the **Random User API**, shapes it into a cleaner format, and returns just what the frontend needs.
This separation makes testing and iteration easier.


### **2. Using cache to store users **

One of the first problems I noticed: every time I refreshed or navigated around, the app would re-fetch all user data.
That meant unnecessary network calls and slower perceived performance, the main user profile would constantly change each time as well.

I decided to introduce a simple **in-memory cache** (a global variable that stores fetched users temporarily).
Since frequent API calls slow down UX and students browsing profiles shouldn’t have to wait for another fetch if they’ve already seen the same data we can cache the fetched users in memory. We can avoid redundant API calls and avoid hitting rate limits.
Now the app only calls the Random User API the first time it’s needed. After that, it serves cached data until a refresh or revalidation event.

Trade-off: The cache resets on server restart or refresh (since it’s in-memory). For a real production app, I’d use persistent or distributed caching (like Redis or localStorage).

### **3. Component-first UI structure**

The UI is broken into modular pieces, the `ProfileCard` displays individual users and can be reused anywhere.
This keeps the layout consistent and makes it easy to scale the design later.

Each card receives a single `user` object prop, this made testing straightforward and avoided unnecessary state complexity.

### **4. Fetching data efficiently on the frontend**

The frontend calls `/api/users` once when the Discover page loads.
If cached data already exists, it just reuses that, so the UI feels instant even when navigating back and forth.


## What I’d Do Next

If I had more time:

* Implement **search, filters, and pagination**
* Style with Tailwind for a cleaner, modern student-facing look
* Add integration tests for end-to-end flow