import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((product) => (
          <li key={product._id}>
            {product.name} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
