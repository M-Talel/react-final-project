function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <div className="search-field">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
