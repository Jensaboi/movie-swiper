import { useState, type JSX } from "react";
type MediaCardProps = {
  name: string;
  backdropPath: string;
  genreIds: number[];
  id: number;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
  setIndex: (prev: number) => void;
};

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default function MediaCard({
  name,
  posterPath,
  id,
  overview,
  releaseDate,
  voteAverage,
  voteCount,
  setIndex,
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
      console.log("right");
      setStartPos(null);
      setIndex((prev: number) => prev + 1);
    } else if (currPos + SWIPE_LENGTH < startPos) {
      console.log("left");
      setStartPos(null);
      setIndex((prev: number) => prev + 1);
    }
  }

  return (
    <article className="media-card">
      <img
        onTouchStart={handleSetStartingPos}
        onTouchMove={handleSwipe}
        alt={`Poster of ${name}`}
        src={IMG_BASE_URL + posterPath}
      />
    </article>
  );
}
