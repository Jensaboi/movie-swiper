import { useState, type JSX } from "react";

type MediaCardProps = {
  name: string;
  genreIds: number[];
  id: number;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
  backdropPath: string;
  handleSwipeRight: () => void;
  handleSwipeLeft: () => void;
};

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default function MediaCard({
  name,
  posterPath,
  backdropPath,
  id,
  overview,
  releaseDate,
  voteAverage,
  voteCount,
  handleSwipeLeft,
  handleSwipeRight,
}: MediaCardProps): JSX.Element {
  const [startPos, setStartPos] = useState<number | null>(null);

  function handleSetStartingPos(e): void {
    const clientX: number = e.touches[0].clientX;

    setStartPos(clientX);
  }

  function handleSwipe(e): void {
    if (!startPos) return;

    const currPos = e.touches[0].clientX;
    const SWIPE_LENGTH = 150;

    if (currPos - SWIPE_LENGTH > startPos) {
      //right swipe
      setStartPos(null);
      handleSwipeRight();
    } else if (currPos + SWIPE_LENGTH < startPos) {
      //left swipe
      setStartPos(null);
      handleSwipeLeft();
    }
  }

  const img = posterPath
    ? IMG_BASE_URL + posterPath
    : IMG_BASE_URL + backdropPath;

  return (
    <article className="media-card">
      <img
        onTouchStart={handleSetStartingPos}
        onTouchMove={handleSwipe}
        alt={`Poster of ${name}`}
        src={img}
      />
    </article>
  );
}
