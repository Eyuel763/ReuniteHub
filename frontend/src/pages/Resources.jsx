import React, { useEffect, useState } from "react";
import useResourcesStore from "../Store/resourcesStore.jsx";
import ResourceCard from '../Componenets/ResourceCard.jsx';
// import "../styles/index.css";

const Resources = () => {
  const {
    filteredResources,
    loading,
    filters,
    fetchResources,
    setFilter,
    resetFilters,
  } = useResourcesStore();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleSearch = (e) => {
    setFilter("query", e.target.value);
  };

  const toggleTypeFilter = (type) => {
    const normalizedType = type.toLowerCase();
    const currentTypes = [...filters.type];
    const index = currentTypes.indexOf(normalizedType);

    if (index >= 0) {
      currentTypes.splice(index, 1);
    } else {
      currentTypes.push(normalizedType);
    }

    setFilter("type", currentTypes);
  };

  const setLanguageFilter = (language) => {
    setFilter("language", language);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    resetFilters();
  };

  return (
    <div className="resources-container">
      <header className="resources-header">
      <h1 className="text-2xl font-semibold mb-6 text-center">ReuniteHub Resources</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={filters.query}
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={toggleFilters} className="filter-toggle-btn">
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-section">
            <div className="type-filters">
              {["guide", "contact", "legal", "mental-health"].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleTypeFilter(type)}
                  className={`type-btn ${
                    filters.type.includes(type.toLowerCase()) ? "active" : ""
                  }`}
                >
                  {type.replace("-", " ")}
                </button>
              ))}
            </div>

            <div className="language-filter">
              <label className="language-label">Language:</label>
              <select
                value={filters.language || ""}
                onChange={(e) => setLanguageFilter(e.target.value || null)}
                className="language-select"
              >
                <option value="">All</option>
                <option value="English">English</option>
                <option value="Amharic">Amharic</option>
                <option value="Oromo">Oromo</option>
                <option value="Somali">Somali</option>
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        )}
      </header>

      <main className="resources-main">
        {loading ? (
          <div className="status-message">Loading...</div>
        ) : filteredResources.length === 0 ? (
          <div className="status-message">No resources found.</div>
        ) : (
          <div className="resource-list">
            {filteredResources.map((resource, index) => (
              <div className="card-wrapper" key={index}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Resources;