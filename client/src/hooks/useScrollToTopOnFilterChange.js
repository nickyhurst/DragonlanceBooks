import { useEffect, useRef } from "react";

export default function useScrollToTopOnFilterChange({
  isMobile,
  targetRef,
  deps = [],
}) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    requestAnimationFrame(() => {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [isMobile, targetRef, ...deps]);
}