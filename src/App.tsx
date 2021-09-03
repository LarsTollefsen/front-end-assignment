import React, { useState, useEffect } from 'react';
import magnifyingGlass from './assets/magnifying-glass.svg';
import magnifyingGlassWhite from './assets/magnifying-glass-white.svg';
import cross from './assets/cross.svg';
import TableContent from './components/TableContent';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  function fetchData(e: { preventDefault: () => void }) {
    e.preventDefault();
    setSearch('');
    setResults([]);

    fetch(`http://localhost:4000/api/ships/${search}`)
      .then((res) => res.json())
      .then((result) => {
        setResults(result);
      });
  }

  useEffect(() => {
    if (search !== '') {
      const delayDebounceFn = setTimeout(() => {
        fetch(`http://localhost:4000/api/ships/${search}`)
          .then((res) => res.json())
          .then((result) => {
            setResults(result);
          });
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [search]);

  function updateSearch(event: { target: { value: any } }) {
    setSearch(event.target.value);
  }

  function resetSearch() {
    setSearch('');
  }

  return (
    <>
      <div className="w-full h-screen mt-12">
        <div className="w-full flex justify-center">
          <form
            onSubmit={fetchData}
            className="w-full mr-8 md:w-1/2 lg:w-1/4 relative"
          >
            <input
              onChange={updateSearch}
              placeholder="Search"
              value={search}
              className="flex shadow-lg border-gray-200 border-1 focus:outline-none focus:border-2 focus:placeholder-transparent focus:border-blue-800  w-full  h-12 px-4 pr-24 mx-4"
            />

            {search === '' && (
              <button
                type="submit"
                className="absolute top-0 right-0 mt-3 -mr-1"
              >
                <img src={magnifyingGlass} alt="Magnifying glass" />
              </button>
            )}
            {search !== '' && (
              <div>
                <button
                  type="submit"
                  className="absolute top-0 right-0 bg-blue-800 p-3 -mr-4"
                >
                  <img src={magnifyingGlassWhite} alt="Magnifying glass" />
                </button>
                <button
                  type="reset"
                  onClick={resetSearch}
                  className="absolute top-0 right-0 mt-3 mr-12 "
                >
                  <img src={cross} alt="Cross" />
                </button>
              </div>
            )}
          </form>
        </div>
        {results.length > 0 && (
          <div className="w-full flex justify-center mt-12">
            <table className="table-auto w-full md:w-1/2 border-b-1">
              <thead className="border-b-1">
                <tr>
                  <th>Ship ID</th>
                  <th>Name</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res) => (
                  <>
                    <TableContent res={res} />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
