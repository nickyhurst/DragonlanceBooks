import { useState } from "react";

export default function FiltersBar({
  isMobile,
  category,
  setCategory,
  collectionFilter,
  setCollectionFilter,
  //onlyCollected,
  //setOnlyCollected,
  onlyHardcover,
  setOnlyHardcover,
  q,
  setQ,
  total,
}) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileFilters = () => {
   if (isMobile) {
    //if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    closeMobileFilters();
  };

  const handleCollectionFilterChange = (value) => {
    setCollectionFilter(value);
    closeMobileFilters();
  };

  const handleHardcoverChange = (checked) => {
    setOnlyHardcover(checked);
    closeMobileFilters();
  };

  return (
    <div className="sticky-header ps-2 pb-2">
      <div className="filter-toolbar filter-toolbar--mobile-friendly">
        
        <div className="filter-toolbar__top">
          <div className="filter-toolbar__brand">
            <img
              src="/Dragonlance1eLogoFull.webp"
              className="img-fluid"
              style={{ maxHeight: 70 }}
              alt="Dragonlance"
            />
          </div>
           
           <button
            type="button"
            className="btn btn-sm btn-outline-primary mobile-filter-toggle me-1 ms-auto"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-filter-panel"
          >
            {mobileOpen && (
              <span className="mobile-filter-indicators ms-2">
                 <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-sliders"} me-1`} />
              </span>
            )}
           
            
            {/* Filters  */}
            {!mobileOpen && (
              
              <span className="mobile-filter-indicators ms-2">
                 <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-sliders"} me-1`} />
                 
                {category === "books" && (
                  <i className="fa-solid fa-book-open text-category ms-1" />
                )}

                {category === "comics" && (
                  <i className="fa-solid fa-newspaper text-category ms-1" />
                )}

                {collectionFilter === "collected" && (
                  <i className="fa-solid fa-check text-success ms-1" />
                )}

                {collectionFilter === "uncollected" && (
                  <i className="fa-solid fa-xmark text-danger ms-1" />
                )}

                {onlyHardcover && (
                  <i className="fa-solid fa-book text-hardcover ms-1" />
                )}

                
                
                 
              </span>
            )}

          </button>

        </div>

        <div className="filter-toolbar__search-row">
          <input
            className="form-control form-control-sm"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="filter-count small text-secondary">
            Showing <span className="text-white">{total}</span> items
          </div>
        </div>

        <div
          id="mobile-filter-panel"
          className={`filter-toolbar__controls-wrap ${mobileOpen ? "is-open" : ""}`}
        >
          <div className="filter-toolbar__controls">
            <div className="filter-chip-group">
              <span className="filter-label">Category</span>
              <div className="btn-group collection-filter-group" role="group" aria-label="Category">
                <button
                className={`btn btn-sm collection-btn-books-all ${
                  category === "all" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("all")}
                type="button"
              >
                <i className="fa-solid fa-layer-group me-1" /> All
              </button>
              <button
                className={`btn btn-sm collection-btn-books ${
                    category === "books" ? "active" : ""
                  }`}
                onClick={() => handleCategoryChange("books")}
                type="button"
              >
                <i className="fa-solid fa-book-open me-1" /> Books
              </button>
              <button
                className={`btn btn-sm collection-btn-comics ${
                  category === "comics" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("comics")}
                type="button"
              >
                <i className="fa-solid fa-newspaper me-1" /> Comics
              </button>

                
              </div>
            </div>

            <div className="filter-chip-group">
              <span className="filter-label">Collection</span>
              <div
                className="btn-group collection-filter-group"
                role="group"
                aria-label="Collection status"
              >
                <button
                  type="button"
                  className={`btn btn-sm collection-btn-all ${
                    collectionFilter === "all" ? "active" : ""
                  }`}
                  onClick={() => handleCollectionFilterChange("all")}
                >
                  <i className="fa-solid fa-layer-group me-1" />
                  All
                </button>
                <button
                  type="button"
                  className={`btn btn-sm collection-btn-collected ${
                    collectionFilter === "collected" ? "active" : ""
                  }`}
                  onClick={() => handleCollectionFilterChange("collected")}
                >
                  <i className="fa-solid fa-check me-1" />
                  Collected
                </button>
                <button
                  type="button"
                  className={`btn btn-sm collection-btn-uncollected ${
                    collectionFilter === "uncollected" ? "active" : ""
                  }`}
                  onClick={() => handleCollectionFilterChange("uncollected")}
                >
                  <i className="fa-solid fa-xmark me-1" />
                  Not Collected
                </button>
              </div>
            </div>

            <div className="filter-chip-group">
              <span className="filter-label">Format</span>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlyHardcover"
                  checked={onlyHardcover}
                  onChange={(e) => handleHardcoverChange(e.target.checked)}
                />
                <label className="form-check-label text-white" htmlFor="onlyHardcover">
                  Hardcover only
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        
        
         
  );
}