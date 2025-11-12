import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { products, search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products whenever the search query changes
  useEffect(() => {
    if (!search) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  if (!showSearch) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center relative">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <button onClick={() => setSearch("")} className="ml-2 text-gray-400 hover:text-gray-600">
          &#128269; {/* simple magnifying glass emoji icon */}
        </button>
      </div>

      <button
        onClick={() => setShowSearch(false)}
        className="absolute top-5 right-5 w-5 h-5 text-gray-500 hover:text-gray-700"
      >
        &#10005; {/* cross icon */}
      </button>

      {/* Search Results */}
      {filteredProducts.length > 0 && (
        <div className="bg-white border rounded shadow-md max-h-80 overflow-y-auto mt-2 mx-3">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="block px-4 py-2 text-left hover:bg-gray-100 text-sm"
              onClick={() => setShowSearch(false)}
            >
              {product.name}
            </Link>
          ))}
        </div>
      )}

      {search && filteredProducts.length === 0 && (
        <div className="bg-white border rounded shadow-md max-h-80 overflow-y-auto mt-2 mx-3 text-sm text-gray-500 px-4 py-2">
          No products found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
