import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Controls from "./components/Controls.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import Pagination from "./components/Pagination.jsx";
import { fetchPodcasts } from "./api/fetchPodcasts.js";
import { getVisiblePodcasts } from "./utils/filterPodcasts.js";
import { genres } from "./data.js";

/** How many podcasts to show per page. */
const PAGE_SIZE = 8;

/**
 * App - the root component. It owns all the state (data + search/filter/sort/page)
 * so every control stays in sync, then derives the visible page from that state.
 *
 * @returns {JSX.Element}
 */
export default function App() {
  // data state
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ui state (kept in one place so the controls never fight each other)
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // fetch once on load
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // any change to search/filter/sort sends us back to page 1
  useEffect(() => {
    setPage(1);
  }, [search, genre, sort]);

  // the full filtered + sorted list (recomputed only when its inputs change)
  const visible = useMemo(
    () => getVisiblePodcasts(podcasts, { search, genre, sort }),
    [podcasts, search, genre, sort]
  );

  // the slice for the current page
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5 sm:px-8 py-7">
        <Controls
          search={search}
          onSearch={setSearch}
          genre={genre}
          onGenre={setGenre}
          sort={sort}
          onSort={setSort}
          genres={genres}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <div className="spinner"></div>
            <p>Loading podcasts…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-gray-800">Something went wrong</p>
            <p className="text-sm text-gray-500">
              Error occurred while fetching podcasts: {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <PodcastGrid podcasts={pageItems} genres={genres} />
            <Pagination currentPage={page} pageCount={pageCount} onPageChange={setPage} />
          </>
        )}
      </main>
    </>
  );
}
