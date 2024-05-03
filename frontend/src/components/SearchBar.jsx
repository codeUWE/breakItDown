import React, { useState } from 'react';
import search from '../assets/search.png';

const SearchBar = ({ data, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

	return (
		<>
        <div className="w-[392.98px] h-[53.67px] rounded-[20px] border-solid border-2 border-black flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Search"
                    className=" font-[300] text-[22px] flex justify-between items-center px-3 "
                />
                <img
                    src="https://img.icons8.com/?size=50&id=132&format=png"
                    alt=""
                    width={29}
                    height={38}
                />
            </div>
        {/* <div class="relative">
  <input type="text" placeholder="Search" className="w-[392.98px] h-[53.67px] rounded-[20px] border-solid border-2 border-black font-[300] text-[32px] flex justify-between items-center px-3 bg-[url('./src/assets/search.png')] bg-no-repeat bg-right bg-contain" />
</div> */}
        </>
	);
}

export default SearchBar;


{/* <div className='name'>

<input className='w-[392.98px] h-[53.67px] rounded-[20px] border-solid border-2 border-black font-[300] text-[32px] flex justify-between items-center px-3'
type="text"
value={query}
onChange={handleChange}
placeholder="Search"
/>

<img
                    src={search}
                    alt="Icon for searching"
                    width={29}
                    height={38}
                    className="bg.[url('frontend/src/assets/search.png')]"
                />
</div>     */}
