import { useEffect, useMemo, useState } from "react";
import { isCollected, isComic, isHardcover } from "../utils/bookUtils";

const STORAGE_KEY = "dl_filters";

export default function useBookFilters(books) {
  const [category, setCategory] = useState("books");
  const [onlyCollected, setOnlyCollected] = useState(false);
  const [onlyHardcover, setOnlyHardcover] = useState(false);
  const [q, setQ] = useState("");
  const [qLive, setQLive] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const s = JSON.parse(saved);
      if (s.category) setCategory(s.category);
      if (typeof s.onlyCollected === "boolean") setOnlyCollected(s.onlyCollected);
      if (typeof s.onlyHardcover === "boolean") setOnlyHardcover(s.onlyHardcover);
      if (typeof s.q === "string") setQ(s.q);
    } catch {
      console.error("bad local storage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        category,
        onlyCollected,
        onlyHardcover,
        q,
      })
    );
  }, [category, onlyCollected, onlyHardcover, q]);

  useEffect(() => {
    const t = setTimeout(() => {
      setQLive(q.trim().toLowerCase());
    }, 150);

    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    let list = books;

    if (category === "books") list = list.filter((b) => !isComic(b));
    if (category === "comics") list = list.filter((b) => isComic(b));

    if (onlyCollected) list = list.filter(isCollected);
    if (onlyHardcover) list = list.filter(isHardcover);

    return list;
  }, [books, category, onlyCollected, onlyHardcover]);

  const searched = useMemo(() => {
    if (!qLive) return filtered;

    return filtered.filter((b) => {
      const haystack = [
        b?.Title,
        b?.Series,
        b?.Volume,
        b?.Author,
        b?.Year,
        b?.Edition,
        b?.Version,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(qLive);
    });
  }, [filtered, qLive]);

  return {
    category,
    setCategory,
    onlyCollected,
    setOnlyCollected,
    onlyHardcover,
    setOnlyHardcover,
    q,
    setQ,
    qLive,
    searched,
  };
}