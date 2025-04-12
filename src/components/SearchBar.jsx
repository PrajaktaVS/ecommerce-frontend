export const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}