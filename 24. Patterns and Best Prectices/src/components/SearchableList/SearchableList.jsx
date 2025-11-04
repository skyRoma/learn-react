import { useRef, useState } from "react";

export function SearchableList({ items, itemKeyFn, children }) {
  const [searchValue, setSearchValue] = useState('');
  const lastChange = useRef();

  const searchResults = items.filter(item =>
    JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchValue(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) =>
          <li key={itemKeyFn(item)}>
            {children(item)}
          </li>
        )}
      </ul>
    </div>
  )
}
