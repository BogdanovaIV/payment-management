import { useEffect, useRef } from "react";

const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  data,
  isSmallScreen,
  show,
}) => {
  const tableBodyRef = useRef(null);
  const cardsRef = useRef(null);

  /*  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const container = isSmallScreen ? cardsRef.current : tableBodyRef.current;
    if (!container) return;

    const lastRow = container.lastElementChild;
    if (!lastRow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.8 }
    );

    observer.observe(lastRow);

    return () => {
      if (lastRow) observer.unobserve(lastRow);
    };
  }, [hasNextPage, isFetching, fetchNextPage, data, isSmallScreen]); */

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const container = isSmallScreen ? cardsRef.current : tableBodyRef.current;
    if (!container) return;

    const lastRow = container.lastElementChild;
    if (!lastRow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.8 }
    );

    observer.observe(lastRow);

    return () => {
      if (lastRow) observer.unobserve(lastRow);
    };
  }, [hasNextPage, isFetching, fetchNextPage, data, isSmallScreen, show]);

  return { tableBodyRef, cardsRef };
};

export default useInfiniteScroll;
