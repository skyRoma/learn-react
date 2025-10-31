import { useState, useEffect, } from 'react';
import { searchProducts } from './fakeApi'; // Шаг 1b
import { useDebounce } from '../../components/hooks/useDebounce';

const categories = ['All', 'Hardware', 'Software', 'Peripherals'];

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    inStockOnly: false
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       setIsLoading(true);
  //       setError(null);

  //       try {
  //         const response = await searchProducts(debouncedSearchTerm, filters);
  //         setResults(response.data);
  //       } catch (err) {
  //         setError("Failed to load data.");
  //         setResults([]);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();

  //   }, [debouncedSearchTerm, filters]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const url = new URL('http://localhost:8080/products/search');
    url.searchParams.set('query', debouncedSearchTerm);
    url.searchParams.set('category', filters.category);
    url.searchParams.set('inStockOnly', filters.inStockOnly.toString());

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url.toString(), { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data.data);
        setIsLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted (Success)');
          return;
        }

        setError("Не удалось загрузить данные. Проверьте сервер.");
        setResults([]);
        setIsLoading(false)
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };

  }, [debouncedSearchTerm, filters]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Product Search</h1>

      <input
        type="text"
        placeholder="Enter the product name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '100%', marginBottom: '15px' }}
      />

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>

        <div>
          <label>Category:</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <input
            type="checkbox"
            id="inStockOnly"
            checked={filters.inStockOnly}
            onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
          />
          <label htmlFor="inStockOnly" style={{ marginLeft: '5px' }}>Only in stock</label>
        </div>
      </div>

      {isLoading && <p style={{ color: 'blue' }}>Loading results..</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!isLoading && !error && (
        <div style={{ borderTop: '1px solid #ccc', paddingTop: '15px' }}>
          <h2>Products found: {results.length}</h2>
          {results.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.map(item => (
                <li key={item.id} style={{ padding: '10px', borderBottom: '1px dotted #eee' }}>
                  <strong>{item.name}</strong> ({item.category}) - ${item.price}

                  {!item.inStock && <span style={{ color: 'gray', marginLeft: '10px' }}> (Not available)</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>There are no results matching your query or filters.</p>
          )}
        </div>
      )}
    </div>
  );
}
