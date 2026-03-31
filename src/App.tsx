import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMedia } from "./service/tmdbApi";
import MediaCard from "./components/MediaCard";
import type { JSX } from "react";
import SwipeButtons from "./components/SwipeButtons";

function App(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<any[]>([]);
  const page = Math.floor(index / 20) + 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["media", page],
    queryFn: () => getMedia({ media: "movie", page }),
  });
  const queryClient = useQueryClient();

  const modIndex = index % data?.length;

  useEffect(() => {
    if (modIndex === 15) {
      const preFetchMedia = async () => {
        try {
          const data = await queryClient.fetchQuery({
            queryKey: ["media", page + 1],
            queryFn: () => getMedia({ media: "movie", page: page + 1 }),
          });
          console.log(data);
          queryClient.setQueryData(["media", page + 1], old => [
            ...old,
            ...data,
          ]);
        } catch (err) {
          console.log(err);
        }
      };

      preFetchMedia();
    }
  }, [modIndex]);

  if (isLoading) return <h2>loading</h2>;

  if (isError) return <h2>Error </h2>;

  const currentMedia = data[index];

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
