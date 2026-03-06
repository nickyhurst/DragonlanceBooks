import { useRef } from "react";
import { HelmetProvider } from "react-helmet-async";

import useIsMobile from "./hooks/useIsMobile";
import useBooks from "./hooks/useBooks";
import useBookFilters from "./hooks/useBookFilters";
import useMobileInfiniteScroll from "./hooks/useMobileInfiniteScroll";
import useImageModal from "./hooks/useImageModal";
import useScrollToTopOnFilterChange from "./hooks/useScrollToTopOnFilterChange";
import usePrefetchCoverImages from "./hooks/usePrefetchCoverImages";

import MobileCard from "./components/MobileCard";
import BookTable from "./components/BookTable";
import FiltersBar from "./components/FiltersBar";
import ImageModal from "./components/ImageModal";
import SeoMeta from "./components/SeoMeta";

export default function App() {
  const topRef = useRef(null);

  const isMobile = useIsMobile(768);
  const { books, loading } = useBooks();

  const {
    category,
    setCategory,
    onlyCollected,
    setOnlyCollected,
    onlyHardcover,
    setOnlyHardcover,
    q,
    setQ,
    searched,
  } = useBookFilters(books);

  const {
    visibleCount: mobileVisible,
    visibleItems: mobileItems,
    loadMoreRef,
  } = useMobileInfiniteScroll(searched, isMobile, loading, 25);

  const {
    isOpen: modalOpen,
    image: modalImg,
    alt: modalAlt,
    openModal: openImageModal,
    closeModal: closeImageModal,
  } = useImageModal();

  useScrollToTopOnFilterChange({
    isMobile,
    targetRef: topRef,
    deps: [category, onlyCollected, onlyHardcover],
  });

  usePrefetchCoverImages(searched, {
    enabled: isMobile,
    startIndex: mobileVisible,
    count: 12,
  });

  return (
    <HelmetProvider>
      <SeoMeta />

      <div className="bg-dark min-vh-100">
        <div className="w-100 ps-2 pe-2 pb-4">
          <div className="m-0 p-0" ref={topRef} />

          <FiltersBar
            category={category}
            setCategory={setCategory}
            onlyCollected={onlyCollected}
            setOnlyCollected={setOnlyCollected}
            onlyHardcover={onlyHardcover}
            setOnlyHardcover={setOnlyHardcover}
            q={q}
            setQ={setQ}
            total={searched.length}
          />

          <div className="text-white">
            {isMobile ? (
              <div style={{ width: "100%", overflowX: "hidden" }}>
                {mobileItems.map((b) => (
                  <MobileCard key={b.Id} book={b} onOpenImg={openImageModal} />
                ))}

                {!loading && searched.length === 0 ? (
                  <div className="text-secondary small mt-3">No results.</div>
                ) : null}

                {!loading && mobileVisible < searched.length ? (
                  <div ref={loadMoreRef} className="py-3 text-center text-secondary small">
                    Scroll to load more…
                  </div>
                ) : null}

                {!loading && searched.length > 0 ? (
                  <div className="text-secondary small mt-2">
                    Showing <span className="text-white">{mobileItems.length}</span> of{" "}
                    <span className="text-white">{searched.length}</span>
                  </div>
                ) : null}
              </div>
            ) : (
              <BookTable data={searched} loading={loading} onOpenImg={openImageModal} />
            )}
          </div>
        </div>

        <ImageModal
          open={modalOpen}
          image={modalImg}
          alt={modalAlt}
          onClose={closeImageModal}
        />
      </div>
    </HelmetProvider>
  );
}