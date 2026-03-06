import { useEffect } from "react";

export default function usePrefetchCoverImages(items, options = {}) {
  const {
    enabled = true,
    startIndex = 0,
    count = 12,
  } = options;

  useEffect(() => {
    if (!enabled) return;
    if (!Array.isArray(items) || items.length === 0) return;

    const nextItems = items.slice(startIndex, startIndex + count);

    const urls = nextItems
      .map((item) => (item?.Image ? `/covers/${item.Image}` : null))
      .filter(Boolean);

    const links = [];

    for (const url of urls) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    }

    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, [items, enabled, startIndex, count]);
}