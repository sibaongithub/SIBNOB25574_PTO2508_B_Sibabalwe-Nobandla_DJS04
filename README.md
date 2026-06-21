# DJS04 – React Podcast App: Search, Sort, Filter & Pagination

## Overview
An advanced podcast browsing page built with **React**. It builds on the DJS03
landing page and adds live **search**, **sorting**, **genre filtering**, and
**pagination** — all kept in sync so using one control never resets the others.

API: https://podcast-api.netlify.app/ (genre titles come from the local `data.js`).

---

## Features
- **Search** – matches any part of a podcast title and updates as you type.
- **Sort** – Newest first (by last updated date), Title A–Z, and Title Z–A.
- **Filter** – by genre, using the dropdown.
- **Pagination** – shows the podcasts in pages with Prev / numbered / Next buttons.
- **State stays in sync** – search, filter and sort all work together. Changing any
  of them sends you back to page 1, and pagination always respects the active
  search/filter/sort.
- **Loading, error and empty states** are all handled.

---

## Tech Used
- **React** functional components (`useState`, `useEffect`, `useMemo`)
- **Fetch API** for the data
- **Tailwind CSS** (via CDN) for styling
- **Vite** as the dev server / build tool

---

## Project Structure
```
djs04/
├── index.html              Vite entry – loads Tailwind + mounts the app
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx            mounts <App /> into index.html
    ├── App.jsx             owns ALL state and keeps the controls in sync
    ├── data.js             the genre list (id, title, etc.)
    ├── index.css           base styles + spinner animation
    ├── api/
    │   └── fetchPodcasts.js   the API fetch function
    ├── components/
    │   ├── Header.jsx         the top navbar
    │   ├── Controls.jsx       search box + genre filter + sort dropdown
    │   ├── PodcastCard.jsx    one reusable podcast card
    │   ├── PodcastGrid.jsx    the responsive grid (+ empty state)
    │   └── Pagination.jsx     Prev / numbered pages / Next
    └── utils/
        ├── formatDate.js       formats the last-updated date
        └── filterPodcasts.js   pure search / filter / sort functions
```

### How the state works
- **`App.jsx`** holds everything in one place: the fetched `podcasts`, plus the
  `search`, `genre`, `sort` and `page` values.
- When the user types, picks a genre, or changes the sort, `App` recomputes the
  visible list with `getVisiblePodcasts` (in `utils/filterPodcasts.js`) using
  `useMemo`, then slices it for the current page.
- Changing search/genre/sort resets the page back to 1 so you never land on an
  empty page. Pagination only ever pages through the already-filtered list.

---

## How to Run
1. Open the `djs04` folder in your terminal.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the local address Vite prints (usually `http://localhost:5173`).

To make a production build: `npm run build`, then `npm run preview`.

---

## Deliverables
- A React app that fetches and displays podcast data.
- Live search, sorting, genre filtering, and pagination that all work together.
- Centralised state so every control stays in sync.
- Reusable, modular components and JSDoc comments on the key functions.
- Loading, error, and empty states with a responsive layout.
