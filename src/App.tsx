import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMedia } from "./service/tmdbApi";
import MediaCard from "./components/MediaCard";
import type { JSX } from "react";
import SwipeButtons from "./components/SwipeButtons";

function App(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<any[]>([]);
  const page = Math.floor(index / 20) + 1;

  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media", page],
    initialPageParam: 1,
    queryFn: () => getMedia({ media: "movie", page }),
    getNextPageParam: lastPage => lastPage,
  });

  console.log(data);

  const modIndex = index % 20;

  useEffect(() => {
    if (modIndex === 16) {
      fetchNextPage();
    }
  }, [modIndex]);

  if (isFetching) return <h2>loading</h2>;

  if (error) return <h2>Error </h2>;

  const currentMedia = data?.pages?.[page - 1][index];

  function handleSwipeRight() {
    setSelected(prev => [...prev, currentMedia]);
    setIndex(index + 1);
  }

  function handleSwipeLeft() {
    setIndex(index + 1);
  }

  return (
    <main>
      <MediaCard
        name={currentMedia?.title}
        posterPath={currentMedia?.poster_path}
        backdropPath={currentMedia?.backdrop_path}
        id={currentMedia?.id}
        overview={currentMedia?.overview}
        releaseDate={currentMedia?.release_date}
        voteAverage={currentMedia?.vote_average}
        voteCount={currentMedia?.vote_count}
        genreIds={currentMedia?.genre_ids}
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
