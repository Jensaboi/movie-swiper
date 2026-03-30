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
}: MediaCardProps) {
  function handleSwipe(e) {
    const clientX = e.touches[0].clientX;
    console.log(clientX);
  }

  return (
    <article className="media-card">
      <div>
        <img
          onTouchMove={handleSwipe}
          alt={`Poster of ${name}`}
          src={IMG_BASE_URL + posterPath}
        />
      </div>
    </article>
  );
}
