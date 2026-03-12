// src/components/SearchBar.js
// Controlled search input for real-time filtering by patient name

import './SearchBar.css';

/**
 * SearchBar
 * @param {string}   value     - Current search query
 * @param {Function} onChange  - Called with new value on each keystroke
 */
function SearchBar({ value, onChange })
{
    return (
        <div className="search-bar" role="search">
            {/* Magnifier icon */ }
            <span className="search-bar__icon" aria-hidden="true">🔍</span>

            <input
                id="patient-search"
                type="text"
                className="search-bar__input"
                placeholder="Search by patient name…"
                value={ value }
                onChange={ (e) => onChange(e.target.value) }
                aria-label="Search appointments by patient name"
                autoComplete="off"
            />

            {/* Clear button — only visible when there is input */ }
            { value && (
                <button
                    className="search-bar__clear"
                    onClick={ () => onChange('') }
                    aria-label="Clear search"
                    title="Clear"
                >
                    ×
                </button>
            ) }
        </div>
    );
}

export default SearchBar;
