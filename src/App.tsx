import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMedia } from "./service/tmdbApi";
import MediaCard from "./components/MediaCard";
import type { JSX } from "react";
import SwipeButtons from "./components/SwipeButtons";

function App(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<any[]>([]);

  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMedia({ media: "movie", page: pageParam }),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  });

  const modIndex = index % 20;

  useEffect(() => {
    if (modIndex === 16) {
      fetchNextPage();
    }
  }, [modIndex]);

  if (isFetching) return <h2>loading</h2>;

  if (error) return <h2>Error </h2>;

  if (!data) return <h2>Error</h2>;

  const allMedia = data.pages.flat() ?? [];

  const currentMedia = allMedia[index];
  const nextMediaImgPath = allMedia[index + 1]?.poster_path
    ? allMedia[index + 1].poster_path
    : allMedia[index + 1].backdrop_path;

  function handleSwipeRight() {
    setSelected(prev => [...prev, currentMedia]);
    setIndex(index + 1);
  }

  function handleSwipeLeft() {
    setIndex(index + 1);
  }

  console.log(selected);
  return (
    <main>
      <MediaCard
        name={currentMedia?.title}
        posterPath={currentMedia?.poster_path}
        backdropPath={currentMedia?.backdrop_path}
        nextMediaImgPath={nextMediaImgPath}
        handleSwipeRight={handleSwipeRight}
        handleSwipeLeft={handleSwipeLeft}
      />
      <SwipeButtons
        handleSwipeRight={handleSwipeRight}
        handleSwipeLeft={handleSwipeLeft}
      />
    </main>
  );
}

export default App;
