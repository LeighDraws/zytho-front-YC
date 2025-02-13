import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onQueryChange: (query: string) => void;
    suggestions: string[];
}

const SearchBar = ({ onSearch, onQueryChange, suggestions }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    // Au changement dans l'input, remplace la valeur par la nouvelle et set la nouvelle query
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onQueryChange(newQuery);

        // Affiche une liste de suggestions
        const filtered = suggestions
            .filter((suggestion) => suggestion.toLowerCase().includes(newQuery.toLowerCase()))
            .slice(0, 5);
        setFilteredSuggestions(filtered);
    }

    function handleSuggestionClick(suggestion: string) {
        setQuery(suggestion);
        setFilteredSuggestions([]);
        onQueryChange(suggestion);
        onSearch(suggestion);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <div className="flex flex-col items-center ">
            <form onSubmit={handleSubmit} className="flex flex-row w-full justify-center items-center">
                <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4 ">
                    <input
                        type="text"
                        id="search-field"
                        value={query}
                        onChange={handleChange}
                        placeholder="Rechercher une bière ... "
                        className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:bg-transparent focus:border-yellow-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <button className="inline-flex h-full text-white bg-yellow-500 border-0 py-3 px-4 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            <div className="flex flex-row w-[440px] justify-start items-center mt-3">
                {filteredSuggestions.length > 0 && (
                    <ul>
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

export default SearchBar;
