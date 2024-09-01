import FeatherIcon from "feather-icons-react";

function SearchBar(props) {
  const handleSearch = props.handleSearch;
  const handleSubmit = props.handleSubmit;
  return (
    <div className="text-Ash font-poppins w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <button type="submit">
            <FeatherIcon
              icon="search"
              className="absolute top-2 right-3 z-10 opacity-50"
            />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="h-12 border-2 rounded-full w-full px-3 drop-shadow-none"
            onChange={handleSearch}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;