

function SearchBar(props) {

    const handleSearch = props.handleSearch;
  return (
    <div className="text-Ash font-poppins w-full">
      <input type="text" placeholder="Search..." className="h-12 border-2 rounded-full w-full px-3" onChange={handleSearch}/>
    </div>
  );
};

export default SearchBar;