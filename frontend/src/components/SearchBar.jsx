import React, { useState } from 'react';

const SearchBar = ({ data, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

	return (
		<>		
        <div>
      <input className='rounded-full'
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search"
      />
    </div>
		</>
	);
}

export default SearchBar;


