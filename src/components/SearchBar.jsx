// SearchBar.jsx
function SearchBar({ searchTerm, onSearch }) {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search expenses..."
            className="mb-4 w-full p-2 border rounded"
        />
    );
}

console.log("SearchBar component loaded");
export default SearchBar; // This is a default export