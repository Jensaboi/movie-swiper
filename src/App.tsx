import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { getMedia } from "./service/tmdbApi";
import MediaCard from "./components/MediaCard";
import type { JSX } from "react";

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<unknown>([]);
  const [error, setError] = useState<unknown>(null);
  const [index, setIndex] = useState<number>(0);
  const currentMedia = media[index];

  useEffect(() => {
    setLoading(true);
    const loadMedia = async () => {
      try {
        const data = await getMedia({ media: "movie" });

        setMedia(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error...</h2>;
  }

  console.log(currentMedia);
  return (
    <div className="wrapper">
      <MediaCard
        name={currentMedia?.title}
        posterPath={currentMedia?.poster_path}
        id={currentMedia?.id}
        overview={currentMedia?.overview}
        releaseDate={currentMedia?.release_date}
        voteAverage={currentMedia?.vote_average}
        voteCount={currentMedia?.vote_count}
        genreIds={currentMedia?.genre_ids}
        setIndex={setIndex}
      />
      <div>
        <button>
          <X />
        </button>

        <button>
          <Play />
        </button>
      </div>
    </div>
  );
}

export default App;
