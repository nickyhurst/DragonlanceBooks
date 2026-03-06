import { truthyNumber } from "../utils/bookUtils";

export default function MobileCard({ book, onOpenImg }) {
  const collected = truthyNumber(book?.Collected);
  const hard = truthyNumber(book?.["Hard Cover"]);
  const isComic = String(book?.Series ?? "").toLowerCase().includes("dc comic");
  const src = book?.Image ? `/covers/${book.Image}` : null;

  return (
    <div
      className={`mobile-book-card p-3 rounded-3 mb-2 ${
        collected ? "bg-success bg-opacity-25" : "bg-light bg-opacity-10"
      }`}
      style={{ width: "100%", overflowX: "hidden" }}
    >
      <div className="d-flex gap-3" style={{ width: "100%", minWidth: 0 }}>
        <div style={{ width: 72, flex: "0 0 auto" }}>
          {src ? (
            <img
              src={src}
              alt={book?.Title ?? "Cover"}
              className="img-fluid"
              style={{ borderRadius: 6, maxHeight: 90, objectFit: "cover" }}
              onClick={() => onOpenImg(src, book?.Title ?? "Cover")}
              role="button"
            />
          ) : (
            <div
              className="rounded-2 bg-dark bg-opacity-50"
              style={{ width: 72, height: 90 }}
            />
          )}
        </div>

        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <div className="text-white fw-bold fst-italic text-wrap" style={{ overflowWrap: " anywhere" }}>
            {book?.Title}
          </div>

          <div className="text-secondary small text-wrap">
            {book?.Series ? book.Series : ""}
            {book?.Volume ? ` · ${book.Volume}` : ""}
            {book?.Year ? ` · ${book.Year}` : ""}
          </div>

          <div className="text-secondary small text-wrap" style={{ overflowWrap: "anywhere" }}>
            {book?.Author ?? ""}
          </div>

          <div className="mt-2 d-flex gap-2 flex-wrap align-items-center">
            {isComic ? <span className="badge text-bg-info text-dark">Comic</span> : null}
            {collected ? <span className="badge text-bg-success">Collected</span> : null}
            {hard ? <span className="badge text-bg-warning text-dark">Hardcover</span> : null}
          </div>

          <div className="mt-2 d-flex flex-wrap gap-3 small">
            {book?.Edition ? (
              <div className="text-secondary">
                <span className="text-white">Edition:</span> {book.Edition}
              </div>
            ) : null}
            {book?.Version ? (
              <div className="text-secondary">
                <span className="text-white">Version:</span> {book.Version}
              </div>
            ) : null}
          </div>
        </div>

        <div className="text-center" style={{ width: 34, flex: "0 0 auto" }}>
          {collected ? (
            <i className="fa-solid fa-check text-success fs-5" />
          ) : (
            <i className="fa-solid fa-xmark text-danger fs-5" />
          )}
          {hard ? (
            <div className="mt-2">
              <i className="fa-solid fa-book text-white" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}