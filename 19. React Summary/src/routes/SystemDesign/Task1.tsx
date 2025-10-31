import React, { useEffect, useState, useMemo, useCallback } from 'react';

// ---------- Types ----------
interface Movie {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  year: number;
  country: string;
}

interface MovieResponse {
  results: Movie[];
  totalCount: number;
}

interface FiltersMeta {
  genres: { id: string; name: string }[];
  countries: { id: string; name: string }[];
  years: number[];
}

interface FiltersResponse {
  filters: FiltersMeta;
  updatedAt: string;
}

interface FilterState {
  search: string;
  genreId: string | null;
  year: number | null;
  countryId: string | null;
}

interface Pagination {
  currentPage: number;
  pageSize: number;
}

// ---------- Debounce Hook ----------
function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

// ---------- Component ----------
const MovieBrowser: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState<FiltersMeta | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    genreId: null,
    year: null,
    countryId: null,
  });
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const debouncedSearch = useDebounce(filterState.search, 500);

  // ---------- Fetch Filters (cached + suspense-like) ----------
  useEffect(() => {
    let ignore = false;

    async function loadFilters() {
      try {
        const cached = localStorage.getItem('filtersMeta');
        if (cached) {
          setFilters(JSON.parse(cached));
          setLoadingFilters(false);
        }

        const res = await fetch('http://localhost:8080/movies/filters');
        const data: FiltersResponse = await res.json();

        if (!ignore) {
          setFilters(data.filters);
          localStorage.setItem('filtersMeta', JSON.stringify(data.filters));
          setLoadingFilters(false);
        }
      } catch (err) {
        console.error('Failed to load filters:', err);
        setLoadingFilters(false);
      }
    }

    loadFilters();
    return () => {
      ignore = true;
    };
  }, []);

  // ---------- Fetch Movies (with AbortController & debounced search) ----------
  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          search: debouncedSearch ?? '',
          genre: filterState.genreId ?? '',
          year: filterState.year?.toString() ?? '',
          country: filterState.countryId ?? '',
          page: pagination.currentPage.toString(),
          size: pagination.pageSize.toString(),
        });

        const res = await fetch(`http://localhost:8080/movies?${params}`, {
          signal: controller.signal,
        });
        const data: MovieResponse = await res.json();

        setMovies(data.results);
        setTotalCount(data.totalCount);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load movies:', err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMovies();

    return () => controller.abort();
  }, [
    debouncedSearch,
    filterState.genreId,
    filterState.year,
    filterState.countryId,
    pagination,
  ]);

  // const query = gql`
  //   query GetMovies($filter: MovieFilterInput, $pagination: PaginationInput) {
  //     movies(filter: $filter, pagination: $pagination) {
  //       results {
  //         id
  //         title
  //         rating
  //       }
  //       totalCount
  //     }
  //   }
  // `;

  // useEffect(() => {
  //   request('/graphql', query, { filter, pagination }).then((data) =>
  //     setMovies(data.movies.results)
  //   );
  // }, [filter, pagination]);

  // ---------- Handlers ----------
  const handleChange = useCallback(
    (key: keyof FilterState, value: string | number | null) => {
      setFilterState((prev) => ({ ...prev, [key]: value }));
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    },
    []
  );

  // ---------- Derived state ----------
  const totalPages = useMemo(
    () => Math.ceil(totalCount / pagination.pageSize),
    [totalCount, pagination.pageSize]
  );

  // ---------- Render ----------
  if (loadingFilters) {
    return <p className="p-4">Loading filters...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">🎬 Movie Browser</h1>

      {/* --- Filters --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={filterState.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="border rounded p-2 w-full sm:w-64"
        />

        <select
          value={filterState.genreId ?? ''}
          onChange={(e) => handleChange('genreId', e.target.value || null)}
          className="border rounded p-2"
        >
          <option value="">All genres</option>
          {filters?.genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={filterState.year ?? ''}
          onChange={(e) => handleChange('year', Number(e.target.value) || null)}
          className="border rounded p-2"
        >
          <option value="">All years</option>
          {filters?.years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={filterState.countryId ?? ''}
          onChange={(e) => handleChange('countryId', e.target.value || null)}
          className="border rounded p-2"
        >
          <option value="">All countries</option>
          {filters?.countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- Movie Grid --- */}
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {movies.map((m) => (
            <div
              key={m.id}
              className="border rounded p-2 shadow-sm hover:shadow-md transition"
            >
              <img src={m.imgUrl} alt={m.title} className="rounded mb-2" />
              <h3 className="font-medium">{m.title}</h3>
              <p className="text-sm text-gray-600">
                ⭐ {m.rating} • {m.year}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- Pagination --- */}
      <div className="flex justify-center mt-4 gap-3">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setPagination((p) => ({ ...p, currentPage: p.currentPage - 1 }))
          }
        >
          ◀ Prev
        </button>
        <span>
          Page {pagination.currentPage} / {totalPages}
        </span>
        <button
          disabled={pagination.currentPage >= totalPages}
          onClick={() =>
            setPagination((p) => ({ ...p, currentPage: p.currentPage + 1 }))
          }
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default MovieBrowser;
