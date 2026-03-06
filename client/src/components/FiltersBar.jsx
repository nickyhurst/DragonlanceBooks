export default function FiltersBar({
  category,
  setCategory,
  onlyCollected,
  setOnlyCollected,
  onlyHardcover,
  setOnlyHardcover,
  q,
  setQ,
  total,
}) {
  return (
    <div className="sticky-header ps-2 pb-2">
      <img
        src="/Dragonlance1eLogoFull.webp"
        className="img-fluid"
        style={{ maxHeight: 70 }}
        alt="Dragonlance"
      />

      <div className="d-flex flex-wrap align-items-center gap-2 mt-0 pt-2">
        <div className="btn-group" role="group" aria-label="Category">
          <button
            className={`btn btn-sm ${category === "books" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCategory("books")}
            type="button"
          >
            Books
          </button>
          <button
            className={`btn btn-sm ${category === "comics" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCategory("comics")}
            type="button"
          >
            Comics
          </button>
          <button
            className={`btn btn-sm ${category === "all" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCategory("all")}
            type="button"
          >
            All
          </button>
        </div>

        <div className="my-2">
          <div className="form-check form-switch ms-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="onlyCollected"
              checked={onlyCollected}
              onChange={(e) => setOnlyCollected(e.target.checked)}
            />
            <label className="form-check-label text-white" htmlFor="onlyCollected">
              Collected only
            </label>
          </div>

          <div className="form-check form-switch ms-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="onlyHardcover"
              checked={onlyHardcover}
              onChange={(e) => setOnlyHardcover(e.target.checked)}
            />
            <label className="form-check-label text-white" htmlFor="onlyHardcover">
              Hardcover only
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
        <div className="my-2">
          <input
            className="form-control form-control-sm ms-auto"
            style={{ maxWidth: 320 }}
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="my-2 small text-secondary">
          Showing <span className="text-white">{total}</span> items
        </div>
      </div>
    </div>
  );
}