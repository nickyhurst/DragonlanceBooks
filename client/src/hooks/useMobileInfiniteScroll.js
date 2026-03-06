import { useEffect, useMemo, useRef, useState } from "react";

export default function useMobileInfiniteScroll(items, isMobile, loading, pageSize = 25) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loadMoreRef = useRef(null);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  useEffect(() => {
    if (!isMobile) return;
    if (loading) return;
    if (visibleCount >= items.length) return;

    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        if (loadingMoreRef.current) return;
        loadingMoreRef.current = true;

        setVisibleCount((v) => Math.min(v + pageSize, items.length));

        window.setTimeout(() => {
          loadingMoreRef.current = false;
        }, 200);
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, loading, visibleCount, items.length, pageSize]);

  return {
    visibleCount,
    visibleItems,
    loadMoreRef,
  };
}